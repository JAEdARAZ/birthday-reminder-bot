import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { addBirthday, getBirthdays } from "@libs/dynamo";
import { schema } from "./schema";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { commands } from "./commands";
import { getBirthdayTTL } from "@libs/utils";

const handlerLambda: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  console.log(JSON.stringify(event));
  const chatId: string = event.body.message.chat.id;
  const message: string = event.body.message.text || "";
  const messageArr: string[] = message.split("\n");
  console.log(messageArr);
  const command: string = messageArr[0];

  switch (command) {
    case "/getBirthdays":
      const birthdays = await invokeGetBirthdays();
      await sendResponse(chatId, birthdays);
      break;
    case "/addBirthday":
      await invokeAddBirthday(messageArr.slice(1));
      await sendResponse(chatId, "Birthday added successfully!");
      break;
    default:
      await sendExistingCommands(chatId);
  }

  return formatJSONResponse({
    response: { "message": "default message" },
    statusCode: 200
  })
}

async function invokeGetBirthdays() {
  try {
    const birthdays = await getBirthdays();
    const birthdaysArr = birthdays.map(b => {
      return `${b.name} - ${b.birthday}`
    });
    return birthdaysArr.join("\n");
  } catch (error) {
    console.log(error);
  }
}

async function sendExistingCommands(chatId: string) {
  for (const command of commands) {
    await sendResponse(chatId, command);
  }
}

async function invokeAddBirthday(bodyArr: string[]) {
  try {
    const body = JSON.parse(bodyArr.join(""));
    const secondsToNextBirthday = getBirthdayTTL(body.birthday);
    await addBirthday({
      id: uuid(),
      birthday: body.birthday,
      name: body.name,
      TTL: secondsToNextBirthday
    });
  } catch (error) {
    console.log(error);
  }
}

async function sendResponse(chatId: string, data: string) {
  const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const params = {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      text: data,
      chat_id: chatId
    }
  }

  console.log(JSON.stringify(params));
  try {
    await axios.get(telegramUrl, params);
  } catch (error) {
    console.log(error);
  }
}

export const handler = middyfy(handlerLambda, schema);

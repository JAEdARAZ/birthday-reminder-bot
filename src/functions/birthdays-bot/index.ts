import { formatJSONResponse } from "@libs/api-gateway";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { addBirthday, getBirthdays } from "@libs/dynamo";
import { v4 as uuid } from "uuid";
import { commands } from "./commands";
import { getBirthdayTTL, sendResponse } from "@libs/utils";
import { schema } from "./schema";
import { middifyBot } from "@libs/lambda";
const CHAT_ID = process.env.CHAT_ID;

const handlerLambda: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  console.log(JSON.stringify(event));
  const message: string = event.body.message.text || "";
  const messageArr: string[] = message.split("\n");
  const command: string = messageArr[0];

  switch (command) {
    case "/getBirthdays":
      const birthdays = await invokeGetBirthdays();
      await sendResponse(CHAT_ID, birthdays);
      break;
    case "/addBirthday":
      await invokeAddBirthday(messageArr.slice(1));
      break;
    default:
      await sendExistingCommands();
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

async function sendExistingCommands() {
  for (const command of commands) {
    await sendResponse(CHAT_ID, command);
  }
}

async function invokeAddBirthday(bodyArr: string[]) {
  try {
    const body = JSON.parse(bodyArr.map(b => b.trim()).join(""));
    validateBirthdayInput(body);
    const secondsToNextBirthday = getBirthdayTTL(body.birthday);
    await addBirthday({
      id: uuid(),
      birthday: body.birthday,
      name: body.name,
      TTL: secondsToNextBirthday
    });
    await sendResponse(CHAT_ID, "Birthday added successfully!");
  } catch (error) {
    await sendResponse(CHAT_ID, "ERROR adding birthday");
    console.log(error);
  }
}

function validateBirthdayInput(body) {
  const { error } = schema.validate(body);
  if (error) {
    throw error;
  }
}

export const handler = middifyBot(handlerLambda);

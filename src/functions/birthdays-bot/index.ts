import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { schema } from "./schema";
import axios from "axios";

const handlerLambda: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  console.log(JSON.stringify(event));
  const chatId: string = event.body.message.chat.id;
  const message: string = event.body.message.text || "";
  const messageArr: string[] = message.split("\n");
  const command: string = messageArr[0];

  switch (command) {
    case "/getBirthdays":
      const data = await getBirthdays();
      await sendResponse(chatId, data);
      break;
  }

  return formatJSONResponse({
    response: { "message": "default message" },
    statusCode: 200
  })
}

//mock response
async function getBirthdays() {
  const birthdays = ["Jaime: 10/06/1996", "Kristine: 20/09/1996"];
  return birthdays.join("\n");
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

  try {
    const { data: response } = await axios.get(telegramUrl, params);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export const handler = middyfy(handlerLambda, schema);
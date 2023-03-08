import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { schema } from "./schema";

const handlerLambda: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  console.log(JSON.stringify(event));
  //use axios
  /*
  curl --location --request GET 'https://api.telegram.org/bot{botToken}/sendMessage' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "text": "message to send in the chat",
      "chat_id": "chat id"
  }'
  */
  
  return formatJSONResponse({
    response: { "message": "default message" },
    statusCode: 200
  })
}

export const handler = middyfy(handlerLambda, schema);
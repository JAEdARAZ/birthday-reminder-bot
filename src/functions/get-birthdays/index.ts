import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { getBirthdays } from "@libs/dynamo";
import { schema } from "./schema";

const handlerLambda: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  console.log("inside the lambda");
  const birthdays = await getBirthdays();

  return formatJSONResponse({
    message: birthdays
  }, 200)
}

export const handler = middyfy(handlerLambda, schema);
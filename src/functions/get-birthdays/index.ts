import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { getBirthdays } from "@libs/dynamo";
import { schema } from "./schema";

const handlerLambda: ValidatedEventAPIGatewayProxyEvent = async () => {
  const birthdays = await getBirthdays();

  return formatJSONResponse({
    response: { birthdays },
    statusCode: 200
  })
}

export const handler = middyfy(handlerLambda, schema);
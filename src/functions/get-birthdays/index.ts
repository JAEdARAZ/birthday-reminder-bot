import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { schema } from "./schema";

const handlerLambda: ValidatedEventAPIGatewayProxyEvent = async (event) => {

  return formatJSONResponse({
    message: `Hey this is your birthday: ${event.body.birthday}`
  }, 200)
}

export const handler = middyfy(handlerLambda, schema);
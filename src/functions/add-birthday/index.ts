import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { addBirthday } from "@libs/dynamo";
import { schema } from "./schema";

const handlerLambda: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  const input = event.body;
  await addBirthday({
    id: input.birthday,
    birthday: input.birthday,
    name: input.name
  });

  return formatJSONResponse({
    response: input,
    statusCode: 200
  })
}

export const handler = middyfy(handlerLambda, schema);
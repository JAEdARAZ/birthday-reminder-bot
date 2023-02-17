import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { addBirthday } from "@libs/dynamo";
import { schema } from "./schema";
import { v4 as uuid } from "uuid";
import { getBirthdayTTL } from "@libs/utils";

const handlerLambda: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  const { birthday, name } = event.body;
  const secondsToNextBirthday = getBirthdayTTL(birthday);

  await addBirthday({
    id: uuid(),
    birthday: birthday,
    name: name,
    TTL: secondsToNextBirthday
  });

  return formatJSONResponse({
    response: event.body,
    statusCode: 200
  })
}

export const handler = middyfy(handlerLambda, schema);
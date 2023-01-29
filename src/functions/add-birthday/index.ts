import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { addBirthday } from "@libs/dynamo";
import { schema } from "./schema";

const handlerLambda: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  const { birthday, name } = event.body;
  const secondsToNextBirthday = getBirthdayTTL(birthday);

  await addBirthday({
    id: birthday,
    birthday: birthday,
    name: name
  });

  return formatJSONResponse({
    response: event.body,
    statusCode: 200
  })
}

function getBirthdayTTL(birthday: string) {
  let today = new Date();
  let todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(),
    today.getUTCHours(), today.getUTCMinutes()));

  let birthdayArray = birthday.split("/").map(Number);
  let nextBirthdayUTC = new Date(Date.UTC(todayUTC.getFullYear(), birthdayArray[1] - 1, birthdayArray[0], 12));

  if (todayUTC >= nextBirthdayUTC) {
    nextBirthdayUTC.setFullYear(todayUTC.getFullYear() + 1);
  }

  const secondsToNextBirthday = nextBirthdayUTC.getTime() / 1000 - todayUTC.getTime() / 1000;
  return secondsToNextBirthday;
}

export const handler = middyfy(handlerLambda, schema);
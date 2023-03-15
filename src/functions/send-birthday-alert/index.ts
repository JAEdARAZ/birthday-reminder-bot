import { unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBStreamEvent } from "aws-lambda";
import { addBirthday } from "@libs/dynamo";
import { sendResponse } from "@libs/utils";
import { v4 as uuid } from "uuid";

const DELETE_EVENT = "REMOVE";
const CHAT_ID = process.env.CHAT_ID;

export const handler = async (event: DynamoDBStreamEvent) => {
  const record = event.Records[0];
  if (record.eventName == DELETE_EVENT) {
    // @ts-ignore
    const birthday = unmarshall(record.dynamodb.OldImage);
    const message = `It is ${birthday.name.toUpperCase()} birthday - ${birthday.birthday}`;
    try {
      await sendResponse(CHAT_ID, message);
      await addBirthdayNextYear(birthday);
    } catch (error) {
      console.log((error));
    }
  }
}

async function addBirthdayNextYear(birthday: any) {
  await addBirthday({
    id: uuid(),
    birthday: birthday.birthday,
    name: birthday.name,
    month: birthday.month,
    day: birthday.day
  });
}

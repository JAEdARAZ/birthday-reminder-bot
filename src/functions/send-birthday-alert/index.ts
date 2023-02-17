import { unmarshall } from "@aws-sdk/util-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { DynamoDBStreamEvent } from "aws-lambda";
import { emails } from "./emails";
import { addBirthday } from "@libs/dynamo";
import { getBirthdayTTL } from "@libs/utils";
import { v4 as uuid } from "uuid";

const DELETE_EVENT = "REMOVE";

export const handler = async (event: DynamoDBStreamEvent) => {
  const record = event.Records[0];
  if (record.eventName == DELETE_EVENT) {
    // @ts-ignore
    const birthday = unmarshall(record.dynamodb.OldImage);
    console.log(JSON.stringify(birthday));

    try {
      await sendEmail(birthday);
      await addBirthdayNextYear(birthday);
    } catch (error) {
      console.log((error));
    }
  }
}

async function sendEmail(birthday: any) {
  const client = new SESClient({});
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [emails.to]
    },
    Message: {
      Body: {
        Text: { Data: `It is ${birthday.name.toUpperCase()} birthday (${birthday.birthday})` }
      },
      Subject: { Data: `${birthday.name.toUpperCase()} BIRTHDAY!!` }
    },
    Source: emails.from
  });

  console.log(JSON.stringify(command));
  await client.send(command);
}

async function addBirthdayNextYear(birthday: any) {
  const secondsToNextBirthday = getBirthdayTTL(birthday.birthday);
  await addBirthday({
    id: uuid(),
    birthday: birthday.birthday,
    name: birthday.name,
    TTL: secondsToNextBirthday
  });
}

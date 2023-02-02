import { unmarshall } from "@aws-sdk/util-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { DynamoDBStreamEvent } from "aws-lambda";
import { emails } from "./emails";

const DELETE_EVENT = "REMOVE";

export const handler = async (event: DynamoDBStreamEvent) => {
  const record = event.Records[0];
  if (record.eventName == DELETE_EVENT) {
    // @ts-ignore
    const birthday = unmarshall(record.dynamodb.OldImage);
    console.log(JSON.stringify(birthday));
    await sendEmail(birthday);
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
        Text: { Data: `Is ${birthday.name.toUpperCase()} birthday (${birthday.birthday})` }
      },
      Subject: { Data: `${birthday.name} BIRTHDAY!!` }
    },
    Source: emails.from
  });

  console.log(JSON.stringify(command));
  await client.send(command);
}

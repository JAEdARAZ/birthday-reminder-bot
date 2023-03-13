import { dynamoDocClient } from "./clients/dynamo-client";

async function getBirthdays() {
  const response = await dynamoDocClient.scan({
    TableName: process.env.BIRTHDAY_TABLE_NAME
  })

  return response.Items;
}

async function getBirthdaysByMonth(month: number) {
  const response = await dynamoDocClient.query({
    TableName: process.env.BIRTHDAY_TABLE_NAME,
    IndexName: "GS1",
    ExpressionAttributeNames: {
      "#month": "month"
    },
    ExpressionAttributeValues: {
      ":month": month
    },
    KeyConditionExpression: '#month = :month',
    ScanIndexForward: true
  });

  return response.Items;
}

async function addBirthday(birthday: any) {
  console.log(JSON.stringify(birthday));
  await dynamoDocClient.put({
    TableName: process.env.BIRTHDAY_TABLE_NAME,
    Item: birthday
  });
}

export {
  getBirthdays, addBirthday, getBirthdaysByMonth
}
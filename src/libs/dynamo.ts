import { dynamoDocClient } from "./clients/dynamo-client";

async function getBirthdays() {
  const response = await dynamoDocClient.scan({
    TableName: process.env.BIRTHDAY_TABLE_NAME
  })

  return response.Items;
}

async function addBirthday(birthday: any) {
  await dynamoDocClient.put({
    TableName: process.env.BIRTHDAY_TABLE_NAME,
    Item: birthday
  });
}

export {
  getBirthdays, addBirthday
}
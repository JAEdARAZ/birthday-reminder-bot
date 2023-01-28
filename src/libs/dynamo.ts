import { dynamoDocClient } from "./clients/dynamo-client";

async function getBirthdays() {
  const response = await dynamoDocClient.scan({
    TableName: process.env.BIRTHDAY_TABLE_NAME
  })

  return response.Items;
}

export {
  getBirthdays
}
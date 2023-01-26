import { dynamoDocClient } from "./clients/dynamo-client";

async function getBirthdays() {
  const response = await dynamoDocClient.scan({
    TableName: "Birthdays"
  })

  console.log(response);
  

  return response.Items;
}

export {
  getBirthdays
}
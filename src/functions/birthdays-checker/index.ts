import { getBirthdaysByMonth } from "@libs/dynamo";
import { EventBridgeEvent } from "aws-lambda";

export const handler = async (event: EventBridgeEvent<any, any>) => {
  console.log(event.time);
  const monthBirthdays = await getBirthdaysByMonth(2);
}

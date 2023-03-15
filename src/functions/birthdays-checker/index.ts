import { deleteBirthday, getBirthdaysByMonth } from "@libs/dynamo";
import { EventBridgeEvent } from "aws-lambda";

export const handler = async (event: EventBridgeEvent<any, any>) => {
  console.log(event.time);
  const nowUTC = new Date();
  const currentDay = nowUTC.getUTCDate();
  const currentMonth = nowUTC.getUTCMonth() + 1;
  const monthBirthdays = await getBirthdaysByMonth(currentMonth);

  const todayBirthdays = monthBirthdays.filter(birthday =>
    birthday.day == currentDay && birthday.month == currentMonth);

  console.log(todayBirthdays);
  for (const birthday of todayBirthdays) {
    try {
      await deleteBirthday(birthday.id);
    } catch (error) {
      console.log(error);
    }
  }
}

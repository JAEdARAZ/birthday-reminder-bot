import { deleteBirthday, getBirthdaysByMonth } from "@libs/dynamo";
import { sendResponse } from "@libs/utils";
import { EventBridgeEvent } from "aws-lambda";
const FIRST_DAY_OF_MONTH = 1;
const CHAT_ID = process.env.CHAT_ID;

export const handler = async (event: EventBridgeEvent<any, any>) => {
  console.log(event.time);
  const nowUTC = new Date();
  const currentDay = nowUTC.getUTCDate();
  const currentMonth = nowUTC.getUTCMonth() + 1;
  const monthBirthdays = await getBirthdaysByMonth(currentMonth);
  await deleteTodayBirthdays(monthBirthdays, currentDay, currentMonth);

  // TEMPORARY "|| true" TO RECEIVE THE MESSAGE EVERY DAY FOR TESTING
  if (currentDay == FIRST_DAY_OF_MONTH || true) {
    await sendMonthBirthdays(monthBirthdays);
  }
}

async function deleteTodayBirthdays(monthBirthdays, currentDay, currentMonth) {
  const todayBirthdays = monthBirthdays.filter(b =>
    b.day == currentDay && b.month == currentMonth);

  console.log(todayBirthdays);
  for (const birthday of todayBirthdays) {
    try {
      await deleteBirthday(birthday.id);
    } catch (error) {
      console.log(error);
    }
  }
}

async function sendMonthBirthdays(monthBirthdays) {
  const birthdaysArr: string[] = monthBirthdays.map(b => {
    return `- ${b.name}: ${b.birthday}`
  });
  try {
    birthdaysArr.unshift("THIS MONTH'S BIRTHDAYS:");
    await sendResponse(CHAT_ID, birthdaysArr.join("\n"));
  } catch (error) {
    console.log(error);
  }
}

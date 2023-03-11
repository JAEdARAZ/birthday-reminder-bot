import axios from "axios";

export const getBirthdayTTL = (birthday: string) => {
  let today = new Date();
  let todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(),
    today.getUTCHours(), today.getUTCMinutes()));

  let birthdayArray = birthday.split("/").map(Number);
  let nextBirthdayUTC = new Date(Date.UTC(todayUTC.getFullYear(), birthdayArray[1] - 1, birthdayArray[0], 12));

  if (todayUTC.getMonth() > nextBirthdayUTC.getUTCMonth() ||
    (todayUTC.getMonth() == nextBirthdayUTC.getUTCMonth() && today.getUTCDate() >= nextBirthdayUTC.getUTCDate())) {
    nextBirthdayUTC.setFullYear(todayUTC.getFullYear() + 1);
  }

  const secondsToNextBirthday = nextBirthdayUTC.getTime() / 1000 - todayUTC.getTime() / 1000;
  return secondsToNextBirthday;
}

export const sendResponse = async (chatId: string, data: string) => {
  const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const params = {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      text: data,
      chat_id: chatId
    }
  }

  console.log(JSON.stringify(params));
  try {
    await axios.get(telegramUrl, params);
  } catch (error) {
    console.log(error);
  }
}
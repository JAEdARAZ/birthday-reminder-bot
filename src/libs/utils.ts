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
const getBirthdaysCommand = "/getBirthdays";
const addBirthdayCommmand = `/addBirthday
{
  "name" : "INSERT_NAME",
  "birthday": "dd/mm/yyyy"
}`;
const getBirthdaysByMonthCommmand = `/getBirthdaysByMonth
{
  "month" : "INSERT_MONTH"
}`;

export const commands = [
  getBirthdaysCommand,
  addBirthdayCommmand,
  getBirthdaysByMonthCommmand
];
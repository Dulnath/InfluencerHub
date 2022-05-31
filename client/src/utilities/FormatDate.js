function FormatDate(date) {
  var d = new Date(date),
    month = " " + d.getMonth(),
    day = " " + d.getDate(),
    year = d.getFullYear(),
    hours = d.getHours(),
    minutes = d.getMinutes(),
    seconds = d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year, hours, minutes, seconds].join(", ");
}
export default FormatDate;

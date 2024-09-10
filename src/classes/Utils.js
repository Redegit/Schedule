export const formatDateString = (date) => {
  let year = `${date.getFullYear()}`;
  let month = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let day = date.getDate();
  if (day < 10) day = `0${day}`;
  return `${year}.${month}.${day}`;
};

export const compareDates = (date1, date2) => {
  date1 = new Date(date1);
  if (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  ) {
    return true;
  } else {
    return false;
  }
};

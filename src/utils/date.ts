import dayjs from "dayjs";

export function formatDate(): string {
  let date = new Date();
  return dayjs(date).format("DD/MM/YYYY"); // '25/01/2019'
}

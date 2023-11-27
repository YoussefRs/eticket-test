import { toast } from "react-toastify";

export const eventInitDates = [
  { id: "2023/11/15", day: "15", weekDay: "Mittwoch", month: "November" },
  { id: "2024/03/09", day: "09", weekDay: "Samstag", month: "März" },
  { id: "2024/03/10", day: "10", weekDay: "Sonntag", month: "März" },
  { id: "2024/03/11", day: "11", weekDay: "Montag", month: "März" },
  { id: "2024/03/12", day: "12", weekDay: "Dienstag", month: "März" },
  { id: "2024/03/13", day: "13", weekDay: "Mittwoch", month: "März" },
  { id: "2024/03/14", day: "14", weekDay: "Donnerstag", month: "März" },
  { id: "2024/03/15", day: "15", weekDay: "Freitag", month: "März" },
  { id: "2024/03/16", day: "16", weekDay: "Samstag", month: "März" },
  { id: "2024/03/17", day: "17", weekDay: "Sonntag", month: "März" },
  { id: "2024/03/18", day: "18", weekDay: "Montag", month: "März" },
  { id: "2024/03/19", day: "19", weekDay: "Dienstag", month: "März" },
  { id: "2024/03/20", day: "20", weekDay: "Mittwoch", month: "März" },
  { id: "2024/03/21", day: "21", weekDay: "Donnerstag", month: "März" },
  { id: "2024/03/22", day: "22", weekDay: "Freitag", month: "März" },
  { id: "2024/03/23", day: "23", weekDay: "Samstag", month: "März" },
  { id: "2024/03/24", day: "24", weekDay: "Sonntag", month: "März" },
  { id: "2024/03/25", day: "25", weekDay: "Montag", month: "März" },
  { id: "2024/03/26", day: "26", weekDay: "Dienstag", month: "März" },
  { id: "2024/03/27", day: "27", weekDay: "Mittwoch", month: "März" },
  { id: "2024/03/28", day: "28", weekDay: "Donnerstag", month: "März" },
  { id: "2024/03/29", day: "29", weekDay: "Freitag", month: "März" },
  { id: "2024/03/30", day: "30", weekDay: "Samstag", month: "März" },
  { id: "2024/03/31", day: "31", weekDay: "Sonntag", month: "März" },
  { id: "2024/04/01", day: "01", weekDay: "Montag", month: "April" },
  { id: "2024/04/02", day: "02", weekDay: "Dienstag", month: "April" },
  { id: "2024/04/03", day: "03", weekDay: "Mittwoch", month: "April" },
  { id: "2024/04/04", day: "04", weekDay: "Donnerstag", month: "April" },
  { id: "2024/04/05", day: "05", weekDay: "Freitag", month: "April" },
  { id: "2024/04/06", day: "06", weekDay: "Samstag", month: "April" },
  { id: "2024/04/07", day: "07", weekDay: "Sonntag", month: "April" },
];

export const formatDateToDDMMYYYY = (isoDate) => {
  if (!isoDate) {
    return;
  }
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatTimeToHHMM = (timeString) => {
  if (!timeString) {
    return;
  }
  const parts = timeString.split(":");
  const hours = parts[0];
  const minutes = parts[1];

  return `${hours}:${minutes}`;
};

export const extractOrderTime = (dateString) => {
  if (!dateString) {
    return;
  }
  const dateObject = new Date(dateString);

  const hours = dateObject.getUTCHours();
  const minutes = dateObject.getUTCMinutes();
  const seconds = dateObject.getUTCSeconds();

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
};

export const getTotalPrice = (items) => {
  let totalPrice = 0;
  for (const item of items) {
    totalPrice += item.orderQty * item.price;
  }
  return totalPrice.toFixed(2);
};

export const calculateTotalPrice = (checkoutCart) => {
  let totalPriceOfWholeCart = 0;

  checkoutCart.forEach((cartItem) => {
    cartItem.items.forEach((item) => {
      const price = item.price; 
      const orderQty = item.orderQty; 
      totalPriceOfWholeCart += price * orderQty;
    });
  });
  return totalPriceOfWholeCart.toFixed(2);
};

export const handlePaste = (e) => {
  e.preventDefault();
  toast.info("Einfügen ist nicht erlaubt");
};

export const formatDateFull = (inputDate) => {
    if (!inputDate) {
      return;
    }
    const months = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];

    const date = new Date(inputDate);
    const dd = date.getUTCDate();
    const mm = months[date.getUTCMonth()];
    const yyyy = date.getUTCFullYear();

    const formattedDate = `${dd} ${mm}, ${yyyy}`;

    return formattedDate;
  }
const thisMonthInfo = document.getElementById("this-month-holidays");
const nextMonthInfo = document.getElementById("next-month-holidays");
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const country_code = "BG";

export function loadHolidays() {
  fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${country_code}`)
    .then((response) => response.json())
    .then((data) => {
        
      const holidaysThisMonth = data
        .filter((holiday) => {
          const holidayMonth = new Date(holiday.date).getMonth() + 1;
          return holidayMonth === currentMonth;
        })
        .map(holidayToString);
        
      const holidaysNextMonth = data
        .filter((holiday) => {
          const holidayMonth = new Date(holiday.date).getMonth() + 1;
          return holidayMonth === currentMonth + 1;
        })
        .map(holidayToString);
        
      holidaysThisMonth.length > 0
        ? (thisMonthInfo.innerText = "Holidays this month: " + holidaysThisMonth.join(", "))
        : (thisMonthInfo.innerText = "There are no holidays this month");

      holidaysNextMonth.length > 0
        ? (nextMonthInfo.innerText = "Holidays next month: " + holidaysNextMonth.join(", "))
        : (nextMonthInfo.innerText = "There are no holidays next month");
    });
}

function holidayToString(holiday) {
  const date = new Date(holiday.date);
  const day = date.getDate();
  const month = date.toLocaleString("en", { month: "short" });
  return `${day} ${month} - ${holiday.name}`;
}

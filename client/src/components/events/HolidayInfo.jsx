import { useEffect, useState } from "react";

export default function HolidaysInfo() {
  const [holidaysThisMonth, setHolidaysThisMonth] = useState([]);
  const [holidaysNextMonth, setHolidaysNextMonth] = useState([]);

  useEffect(() => {
    const countryCode = "BG";
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${countryCode}`)
      .then((response) => response.json())
      .then((data) => {
        const thisMonth = data
          .filter((holiday) => {
            const holidayMonth = new Date(holiday.date).getMonth() + 1;
            return holidayMonth === currentMonth;
          })
          .map(holidayToString);
        const nextMonth = data
          .filter((holiday) => {
            const holidayMonth = new Date(holiday.date).getMonth() + 1;
            return holidayMonth === currentMonth + 1;
          })
          .map(holidayToString);

        setHolidaysThisMonth(thisMonth);
        setHolidaysNextMonth(nextMonth);
      })
      .catch((error) => {
        console.error("Error fetching holidays:", error);
      });
  }, []);

  const holidayToString = (holiday) => {
    const date = new Date(holiday.date);
    const day = date.getDate();
    const month = date.toLocaleString("en", { month: "short" });
    return `${day} ${month} - ${holiday.name}`;
  };

  return (
    <div className="holidays-info">
      <div className="this-month">
        {holidaysThisMonth.length > 0 ? (
          <div>
            <h4>Holidays this month</h4> <p>{holidaysThisMonth.join("\n")}</p>{" "}
          </div>
        ) : (
          <h2>There are no holidays this month</h2>
        )}
      </div>
      <div className="next-month">
        {holidaysThisMonth.length > 0 ? (
          <div>
            <h4>Holidays next month</h4> <p>{holidaysNextMonth.join("\n")}</p>{" "}
          </div>
        ) : (
          <h2>There are no holidays next month</h2>
        )}
      </div>
    </div>
  );
}

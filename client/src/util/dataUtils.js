import { format } from "date-fns";

export const processData = ({ data = [], sortKey = null, sortOrder = "asc", filterFn = null, limit = null }) => {
  let result = [...data];

  if (filterFn && typeof filterFn === "function") {
    result = result.filter(filterFn);
  }

  if (sortKey) {
    result.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortOrder === "asc" ? 1 : -1;
      if (bVal == null) return sortOrder === "asc" ? -1 : 1;

      const dateA = new Date(aVal);
      const dateB = new Date(bVal);
      const isDateA = !isNaN(dateA.getTime());
      const isDateB = !isNaN(dateB.getTime());

      if (isDateA && isDateB) {
        aVal = dateA;
        bVal = dateB;
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (aVal instanceof Date && bVal instanceof Date) {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      const aStr = String(aVal);
      const bStr = String(bVal);
      return sortOrder === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }

  if (limit && limit > 0) {
    result = result.slice(0, limit);
  }

  return result;
};

export function computeDueDaysHours(dueDate, dueTime) {
  if (!dueDate) {
    return null;
  }

  let dueDateTime;
  if (dueTime) {
    dueDateTime = new Date(`${dueDate}T${dueTime}`);
  } else {
    const due = new Date(dueDate);
    const now = new Date();

    if (due.toDateString() === now.toDateString()) {
      return { days: 0, hours: 0, expired: false };
    }
    dueDateTime = due;
  }

  const now = new Date();
  const diffMinutes = Math.floor((dueDateTime - now) / (1000 * 60));

  if (diffMinutes < 0) {
    return { days: 0, hours: 0, expired: true };
  }

  const days = Math.floor(diffMinutes / (60 * 24));
  const hours = Math.floor((diffMinutes % (60 * 24)) / 60);

  return { days, hours, expired: false };
}

export function formatToDateTime(dateTime) {
  return format(new Date(dateTime), "dd MMM yyyy HH:mm");
}

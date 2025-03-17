export const processData = ({
    data = [],
    sortKey = null,
    sortOrder = "asc",
    filterFn = null,
    limit = null,
  }) => {
    let result = [...data];
  
    if (filterFn && typeof filterFn === "function") {
      result = result.filter(filterFn);
    }
  
    if (sortKey) {
      result.sort((a, b) => {
        const valueA = new Date(a[sortKey]) || a[sortKey];
        const valueB = new Date(b[sortKey]) || b[sortKey];
  
        return sortOrder === "desc" ? valueB - valueA : valueA - valueB;
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

    const dueDateTime = dueTime ? new Date(`${dueDate}T${dueTime}`) : new Date(dueDate);
    const now = new Date();
    const diffMs = dueDateTime - now;
    
    if (diffMs < 0) {
      return { days: 0, hours: 0, expired: true };
    }
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    
    return { days, hours, expired: false };
  }
  
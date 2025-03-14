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
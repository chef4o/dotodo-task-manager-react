export const getDataFromStorageOrServer = async (name, getData, setData) => {
  const cachedData = sessionStorage.getItem(name);

  if (cachedData) {
    setData(JSON.parse(cachedData));
  } else {
    const data = typeof getData === "function" ? await getData() : await getData;
    setData(data);
    sessionStorage.setItem(name, JSON.stringify(data));
  }
};

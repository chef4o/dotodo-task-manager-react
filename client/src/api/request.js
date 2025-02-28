const buildOptions = (data, idToken) => {
  const options = {};

  if (data) {
    options.body = JSON.stringify(data);
  }

  options.headers = {
    "Content-Type": "application/json",
    ...(idToken && { Authorization: `Bearer ${idToken}` }),
  };

  return options;
};

const request = async (method, url, data) => {
  const options = {
      ...buildOptions(data),
      method,
  };

  const response = await fetch(url, options);
  const result = await response.json();

  return result;
};

export const get = (url, idToken = null) => request("GET", url, null, idToken);
export const post = (url, data, idToken = null) => request("POST", url, data, idToken);
export const put = (url, data, idToken = null) => request("PUT", url, data, idToken);
export const remove = (url, idToken = null) => request("DELETE", url, null, idToken);

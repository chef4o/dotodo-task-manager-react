const baseUrl = "http://localhost:3030/jsonstore/users";

export const getUser = async (userId) => {
  const response = await fetch(`${baseUrl}/${userId}`);
  
  return response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${baseUrl}/${userId}`, {
    method: "DELETE",
  });

  return response.json();
};

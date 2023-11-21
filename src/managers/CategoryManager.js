export const getAllCategories = (token) => {
  return fetch(`http://localhost:8000/categories`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

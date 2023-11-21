export const getAllCategories = (token) => {
  return fetch(`http://localhost:8000/categories`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const createCategory = async (newCategory, token) => {
  await fetch("http://localhost:8000/categories", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  });
};

export const deleteCategory = (token, categoryId) => {
  return (
    fetch(`http://localhost:8000/categories/${categoryId}`),
    {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const getAllTags = (token) => {
  return fetch(`http://localhost:8000/tags`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json());
};

export const postTag = (obj, token) => {
  return fetch(`http://localhost:8000/tags`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
};

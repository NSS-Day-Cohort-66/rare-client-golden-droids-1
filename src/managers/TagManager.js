export const getAllTags = (token) => {
  return fetch(`http://localhost:8000/tags`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json());
};

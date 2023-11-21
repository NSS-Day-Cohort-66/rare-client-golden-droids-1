export const getAllTags = (token) => {
  return fetch(`http://localhost:8000/tags`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json());
};

export const deleteTag = (token, tagId) => {
  return fetch(`http://localhost:8000/tags/${tagId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

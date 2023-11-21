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

export const editTag = (tag, tagId, token) => {
  return fetch(`http://localhost:8000/tags/${tagId}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });
};

export const getTagById = (token, tagId) => {
  return fetch(`http://localhost:8000/tags/${tagId}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json());
};

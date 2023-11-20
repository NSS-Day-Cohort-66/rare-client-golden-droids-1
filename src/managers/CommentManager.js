export const postComment = (obj, token) => {
  return fetch(`http://localhost:8000/comments`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
};

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

//! This works as well for the token
// "Authorization": `Token ${localStorage.getItem("auth_token")}`,
// },

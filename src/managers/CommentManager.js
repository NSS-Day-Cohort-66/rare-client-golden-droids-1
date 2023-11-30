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

export const getCommentsByPostId = (token, postId) => {
  return fetch(`http://localhost:8000/comments?post=${postId}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json());
};

export const deleteComment = (token, commentId) => {
  return fetch(`http://localhost:8000/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

//! This works as well for the token
// "Authorization": `Token ${localStorage.getItem("auth_token")}`,
// },

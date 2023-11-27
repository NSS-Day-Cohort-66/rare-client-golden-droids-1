export const getUserPosts = (token) => {
  return fetch(`http://localhost:8000/posts`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const getPostById = (postId, token) => {
  return fetch(`http://localhost:8000/posts/${postId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

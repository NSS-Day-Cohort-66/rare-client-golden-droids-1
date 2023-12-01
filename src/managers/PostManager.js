export const getAllPosts = (token) => {
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

export const getUserPosts = (token) => {
  return fetch(`http://localhost:8000/posts?rare_user=current`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const deletePost = (token, postId) => {
  return fetch(`http://localhost:8000/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const editPost = (post, postId, token) => {
  return fetch(`http://localhost:8000/posts/${postId}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

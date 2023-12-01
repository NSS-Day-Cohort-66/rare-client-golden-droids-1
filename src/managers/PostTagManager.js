export const createPostTag = (postId, selectedTag, token) => {
  const newPostTag = {
    tag: selectedTag,
    post: postId,
  };

  return fetch("http://localhost:8000/post_tags", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPostTag),
  });
};
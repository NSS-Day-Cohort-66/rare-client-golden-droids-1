// need to show list of all posts for logged in user
// use usestate to manage manipulated data
// use useeffect to tell it when and what to render
// JSX to display data properly
// display title, author, and category
// in order by creation date, most recent at top
// create MyPosts link in nav bar
// create route for MyPosts in applicationviews

import { useEffect, useState } from "react";
import { getUserPosts } from "../../managers/PostsManager";

export const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(token).then((postArray) => {
      setPosts(postArray);
    });
  }, [token]);

  return (
    <div>
      <h2>My Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>By: {post.rare_user.user.full_name}</p>
            <p>Category: {post.category.label}</p>
            <p>Published on: {post.publication_date}</p>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

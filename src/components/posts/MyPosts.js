// need to show list of all posts for logged in user
// use usestate to manage manipulated data
// use useeffect to tell it when and what to render
// JSX to display data properly
// display title, author, and category
// in order by creation date, most recent at top
// create MyPosts link in nav bar
// create route for MyPosts in applicationviews

import { useEffect, useState } from "react";
import { getUserPosts } from "../../managers/PostManager";
import { useNavigate } from "react-router-dom";

export const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserPosts(token).then((postArray) => {
      setPosts(postArray);
    });
  }, [token]);

  return (
    <div className="mt-6">
      <h2 className="title has-text-centered mb-6">My Posts</h2>
      <ul className="posts--container px-6 mx-6">
        {posts.map((post) => (
          <li
            key={post.id}
            className="post--container card has-background-success-light mb-6"
            onClick={() => {
              navigate(`/posts/details/${post.id}`);
            }}
          >
            <div className="card-content">
              <h3 className="card-header-title is-centered">{post.title}</h3>
              <p>By: {post.rare_user.user.full_name}</p>
              <p>Category: {post.category.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

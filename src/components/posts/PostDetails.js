import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../managers/PostManager";

export const PostDetails = ({ token }) => {
  const [post, setPost] = useState({});

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId, token).then((postObj) => {
      setPost(postObj);
    });
  }, [token, postId]);

  return (
    <article className="columns is-centered mt-6">
      <div className="column is-three-fifths card has-background-link">
        <h2 className="title has-text-centered mt-4 has-text-white">
          {post.title}
        </h2>
        <div className="detail--container is-flex is-flex-direction-column m-5 px-6 py-5">
          <img src={post.image_url} alt="header" className="card-image" />
          <div className="is-flex is-justify-content-space-between my-3">
            <div>{post.rare_user?.user.full_name}</div>
            <div className="content">{post.publication_date}</div>
          </div>
          <div className="content">{post.content}</div>
        </div>
        <div className="field is-grouped is-grouped-centered mb-3">
          <div className="control">
            <button
              className="button is-warning"
              onClick={() => {
                navigate(`/comments/all/${postId}`);
              }}
            >
              View Comments
            </button>
          </div>
          <div className="control">
            <button
              className="button is-success"
              onClick={() => {
                navigate(`/comments/new/${postId}`);
              }}
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

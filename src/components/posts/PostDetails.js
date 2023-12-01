import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById } from "../../managers/PostManager";

export const PostDetails = ({ token, currentUserId }) => {
  const [post, setPost] = useState({});

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId, token).then((postObj) => {
      setPost(postObj);
    });
  }, [token, postId]);

  const handleDelete = (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete tag?"
    );
    if (confirmDelete) {
      deletePost(token, postId).then(() => {
        navigate(`/posts/mine`);
      });
    }
  };

  return (
    <article className="columns is-centered mt-6">
      <div className="column is-three-fifths card has-background-link">
        <h2 className="title has-text-centered mt-4 has-text-white">
          {post.title}
        </h2>
        <div className="detail--container is-flex is-flex-direction-column m-5 px-6 py-5">
          {post.image_url ? (
            <img src={post.image_url} alt="header" className="card-image" />
          ) : (
            ""
          )}
          <div className="is-flex is-justify-content-space-between my-3">
            <div>{post.rare_user?.user.full_name}</div>
            <div className="content">{post.publication_date}</div>
          </div>
          <div className="content">{post.content}</div>
          <div className="is-flex is-justify-content-end">
            {currentUserId === post.rare_user?.user.id ? (
              <>
                <div className="tag--item">
                  <i
                    className="fa-solid fa-gear fa-lg"
                    onClick={() => {
                      navigate(`/posts/update/${post.id}`);
                    }}
                  ></i>
                </div>
                <div className="tag--item">
                  <i
                    className="fa-solid fa-trash-can fa-lg"
                    onClick={() => handleDelete(post.id)}
                  ></i>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
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

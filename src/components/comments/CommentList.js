import { useEffect, useState } from "react";
import {
  deleteComment,
  getCommentsByPostId,
} from "../../managers/CommentManager";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../../managers/PostManager";
import "./Comment.css";

export const CommentList = ({ token }) => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    getCommentsByPostId(token, postId).then((commentArr) => {
      setComments(commentArr);
    });

    getPostById(postId, token).then((postObj) => {
      setPost(postObj);
    });
  }, [token, postId]);

  const handleDelete = (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this comment?"
    );
    if (confirmDelete) {
      deleteComment(token, commentId).then(() => {
        getCommentsByPostId(token, postId).then((commentArr) => {
          setComments(commentArr);
        });
      });
    }
  };

  const displayComments = () => {
    if (comments && comments.length) {
      return comments.map((comment) => (
        <div className="comment--container m-5 p-4" key={comment.id}>
          <div className="comment--header">
            <div className="comment--item">{comment.author.user.full_name}</div>
            <div className="comment--item">{comment.created_on}</div>
          </div>
          <div className="comment--item">{comment.content}</div>
          {token && (
            <button
              className="delete-comment-button"
              onClick={() => handleDelete(comment.id)}
            >
              Delete
            </button>
          )}
        </div>
      ));
    }
  };

  return (
    <article className="columns is-centered mt-6">
      <div className="column is-three-fifths">
        <h2 className="title has-text-centered">{post.title}</h2>
        <div className="comments--container card has-background-primary-light p-5">
          {displayComments()}
        </div>
        <div className="is-flex is-justify-content-center mt-6">
          <Link to="/post_details">Back to Post</Link>
        </div>
      </div>
    </article>
  );
};

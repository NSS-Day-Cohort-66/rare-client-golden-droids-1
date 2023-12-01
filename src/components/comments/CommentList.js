import { useEffect, useState } from "react";
import { getCommentsByPostId } from "../../managers/CommentManager";
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

  const displayComments = () => {
    if (comments && comments.length) {
      return (
        <div className="comments--container mt-6 px-5">
          {comments.map((comment) => (
            <div className="comment--container mx-5 mb-6 p-4" key={comment.id}>
              <div className="is-flex is-justify-content-space-between">
                <div className="comment--item">
                  {comment.author.user.full_name}
                </div>
                <div className="comment--item">{comment.created_on}</div>
              </div>
              <div className="comment--item">{comment.content}</div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <article className="is-flex is-flex-direction-column is-align-items-center columns mt-6">
      <div className="column is-three-fifths card has-background-link">
        <h2 className="title has-text-centered has-text-white mt-4">
          {post.title}
        </h2>
        {displayComments()}
      </div>
      <div className="is-flex is-justify-content-center my-5">
        <Link to={`/posts/details/${postId}`}>Back to Post</Link>
      </div>
    </article>
  );
};

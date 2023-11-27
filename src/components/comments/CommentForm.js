import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postComment } from "../../managers/CommentManager";

export const CommentForm = ({ token }) => {
  const [newComment, setNewComment] = useState({});
  const { postId } = useParams();

  const navigate = useNavigate();

  const changeCommentState = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    let comment = {
      postId: postId,
      content: newComment.content,
    };

    postComment(comment, token).then(() => {
      navigate(`/comments/all/${postId}`);
    });
  };

  const displayForm = () => {
    return (
      <form className="commentForm" onSubmit={handleSave}>
        <h2 className="commentForm__name">Add New Comment</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="content">Content: </label>
            <input
              type="text"
              name="content"
              required
              autoFocus
              className="form-control"
              value={newComment.content}
              onChange={changeCommentState}
            />
          </div>
        </fieldset>

        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    );
  };

  return <>{displayForm()}</>;
};

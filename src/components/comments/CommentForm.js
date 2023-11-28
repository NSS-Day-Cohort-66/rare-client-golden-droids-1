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
      <section className="columns is-centered mt-6">
        <form
          className="commentForm column is-two-thirds"
          onSubmit={handleSave}
        >
          <h2 className="commentForm__name title">Add New Comment</h2>
          <fieldset className="field">
            <div className="form-group">
              <label className="label">Content: </label>
              <input
                type="text"
                name="content"
                required
                autoFocus
                className="input"
                value={newComment.content}
                onChange={changeCommentState}
              />
            </div>
          </fieldset>

          <div>
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </form>
      </section>
    );
  };

  return <>{displayForm()}</>;
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postComment } from "../../managers/CommentManager";

export const CommentForm = ({ token }) => {
  const [newComment, setNewComment] = useState({});
  //TODO const { postId } = useParams()

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
      //TODO this should just be postId: postId
      postId: parseInt(newComment.postId),
      content: newComment.content,
    };

    postComment(comment, token).then(() => {
      navigate(`/`); //TODO this should navigate to CommentList view
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
        {/* //TODO this shouldn't be an actual input, needs to be grabbed as a useParam once the Post Detail page is available so entire fieldset for postId will be deleted */}
        <fieldset>
          <div className="form-group">
            <label htmlFor="content">Post #: </label>
            <input
              type="number"
              name="postId"
              required
              autoFocus
              className="form-control"
              value={newComment.postId}
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

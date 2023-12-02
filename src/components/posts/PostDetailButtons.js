import { useNavigate } from "react-router-dom";

export const PostDetailButtons = ({ currentUserId, post, setShowTagModal }) => {
  const navigate = useNavigate();

  const openTagModal = () => {
    setShowTagModal(true);
  };

  return (
    <div className="field is-grouped is-grouped-centered mb-3">
      {currentUserId === post.rare_user?.user.id && (
        <div className="control">
          <button className="button" onClick={openTagModal}>
            Manage Tags
          </button>
        </div>
      )}
      <div className="control">
        <button
          className="button is-warning"
          onClick={() => {
            navigate(`/comments/all/${post.id}`);
          }}
        >
          View Comments
        </button>
      </div>
      <div className="control">
        <button
          className="button is-success"
          onClick={() => {
            navigate(`/comments/new/${post.id}`);
          }}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

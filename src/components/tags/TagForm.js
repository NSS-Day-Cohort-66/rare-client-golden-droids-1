import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postTag } from "../../managers/TagManager";

export const TagForm = ({ token }) => {
  const [newTag, setNewTag] = useState({});

  //? need to navigate back to TagList when new tag submitted
  const navigate = useNavigate();

  //? event handler for update tag state as it changes
  const changeTagState = (e) => {
    setNewTag({
      ...newTag,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    let tag = {
      label: newTag.label,
    };
    // do we need token here if just creating tag?
    postTag(tag, token).then(() => {
      navigate(`/tags`);
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
              name="label"
              required
              autoFocus
              className="form-control"
              value={newTag.label}
              onChange={changeTagState}
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

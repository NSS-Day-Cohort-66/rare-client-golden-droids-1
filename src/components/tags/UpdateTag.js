import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editTag, getTagById } from "../../managers/TagManager";

export const UpdateTag = ({ token, staff }) => {
  const [currentTag, setCurrentTag] = useState({});
  const { tagId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getTagById(tagId).then((tagObj) => {
      setCurrentTag(tagObj);
    });
  }, [tagId]);

  const changeTagState = (e) => {
    setCurrentTag({
      ...currentTag,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    let tag = {
      label: currentTag.label,
    };

    editTag(tag, tagId, token).then(() => {
      navigate(`/tags/all`);
    });
  };

  const displayForm = () => {
    return (
      <form className="TagForm" onSubmit={handleSave}>
        <h2 className="TagForm__name">Add New Comment</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="label">Label: </label>
            <input
              type="text"
              name="label"
              required
              autoFocus
              className="form-control"
              value={currentTag.label}
              onChange={changeTagState}
            />
          </div>
        </fieldset>
        <div>
          <button type="submit">Save</button>
        </div>
        <div>
          <button type="submit">Cancel</button>
        </div>
      </form>
    );
  };

  return <>{displayForm()}</>;
};

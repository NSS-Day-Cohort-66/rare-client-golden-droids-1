import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editTag, getTagById } from "../../managers/TagManager";
import "./Tag.css";

export const UpdateTag = ({ token }) => {
  const [currentTag, setCurrentTag] = useState({});
  const { tagId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getTagById(token, tagId).then((tagObj) => {
      setCurrentTag(tagObj);
    });
  }, [token, tagId]);

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
        <h2 className="TagForm__name">Update Tag</h2>
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
        <div className="buttons--container">
          <div className="button--container">
            <button type="submit" onClick={handleSave}>
              Save
            </button>
          </div>
          <div className="button--container">
            <button
              onClick={() => {
                navigate(`/tags/all`);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  };

  return <>{displayForm()}</>;
};

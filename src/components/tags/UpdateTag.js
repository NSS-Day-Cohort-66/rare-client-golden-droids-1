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
      <section className="columns is-centered mt-6">
        <form className="column is-two-thirds" onSubmit={handleSave}>
          <h2 className="title">Update Tag</h2>
          <fieldset className="field">
            <label className="label">Label: </label>
            <div className="control">
              <input
                type="text"
                name="label"
                required
                autoFocus
                className="input"
                value={currentTag.label}
                onChange={changeTagState}
              />
            </div>
          </fieldset>

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-success">
                Save
              </button>
            </div>
            <div className="control">
              <button
                className="button is-danger is-light"
                onClick={() => {
                  navigate(`/tags/all`);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  };

  return <>{displayForm()}</>;
};

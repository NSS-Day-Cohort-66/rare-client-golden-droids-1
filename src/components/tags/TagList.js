import { useEffect, useState } from "react";
import { deleteTag, getAllTags } from "../../managers/TagManager";
import "./Tag.css";
import { useNavigate } from "react-router-dom";

export const TagList = ({ token, staff }) => {
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const retrieveTags = () => {
    getAllTags(token).then((tagArr) => {
      setTags(tagArr);
    });
  };

  useEffect(() => {
    retrieveTags();
  }, []);

  const displayTags = () => {
    if (tags && tags.length) {
      return tags.map((tag) => (
        <div className="tag--container" key={tag.id}>
          {staff ? (
            <>
              <div className="tag--item">
                <i
                  className="fa-solid fa-gear fa-lg"
                  onClick={() => {
                    navigate(`/tags/update/${tag.id}`);
                  }}
                ></i>
              </div>
              <div className="tag--item">
                <i
                  className="fa-solid fa-trash-can fa-lg"
                  onClick={() => handleDelete(tag.id)}
                ></i>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="tag--item">{tag.label}</div>
        </div>
      ));
    }
  };

  const handleDelete = (tagId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete tag?"
    );
    if (confirmDelete) {
      deleteTag(token, tagId).then(() => {
        retrieveTags();
      });
    }
  };

  return (
    <article className="columns is-centered mt-6">
      <div className="column is-one-fifth">
        <h2 className="title has-text-centered">Tags</h2>
        <div className="tags--container card p-3 has-background-success-light">
          {displayTags()}
        </div>
        <div className="is-flex is-justify-content-center mt-6">
          <button
            className="button is-success"
            onClick={() => {
              navigate(`/tags/create`);
            }}
          >
            Create Tag
          </button>
        </div>
      </div>
    </article>
  );
};

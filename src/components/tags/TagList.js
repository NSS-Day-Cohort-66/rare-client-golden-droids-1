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
    <article>
      <h2>Tags</h2>
      <div className="tags--container">{displayTags()}</div>
    </article>
  );
};

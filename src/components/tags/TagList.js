import { useEffect, useState } from "react";
import { getAllTags } from "../../managers/TagManager";
import "./Tag.css";

export const TagList = ({ token, staff }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTags(token).then((tagArr) => {
      setTags(tagArr);
    });
  }, [token]);

  const displayTags = () => {
    if (tags && tags.length) {
      return tags.map((tag) => (
        <div className="tag--container" key={tag.id}>
          {staff ? (
            <>
              <div className="tag--item">
                <i className="fa-solid fa-gear fa-lg"></i>
              </div>
              <div className="tag--item">
                <i className="fa-solid fa-trash-can fa-lg"></i>
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
  return (
    <article>
      <h2>Tags</h2>
      <div className="tags--container">{displayTags()}</div>
    </article>
  );
};

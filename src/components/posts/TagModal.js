import { useEffect, useState } from "react";
import { getAllTags } from "../../managers/TagManager";
import { createPostTag } from "../../managers/PostTagManager";
import { getPostById } from "../../managers/PostManager";

export const TagModal = ({
  token,
  postId,
  setPost,
  setShowTagModal,
  showTagModal,
}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState({});

  useEffect(() => {
    getAllTags(token).then((tagsArray) => {
      setTags(tagsArray);
    });
  }, [token]);

  const closeTagModal = () => {
    setShowTagModal(false);
  };

  const handleTagSelection = (tagId) => {
    const updatedTags = [...selectedTags];
    const index = updatedTags.indexOf(tagId);
    if (index === -1) {
      updatedTags.push(tagId);
    } else {
      updatedTags.splice(index, 1);
    }
    setSelectedTags(updatedTags);
  };

  const handleSaveTags = async () => {
    try {
      const promises = selectedTags.map((tagId) =>
        createPostTag(postId, tagId, token)
      );

      await Promise.all(promises);

      getPostById(postId, token).then((postObj) => {
        setPost(postObj);
      });
      setSelectedTags([]);
      closeTagModal();
    } catch (error) {
      console.error("Error creating post tags:", error);
    }
  };
  return (
    <>
      {showTagModal && (
        <div className="modal is-active">
          <div
            className="modal-background"
            style={{ backgroundColor: "rgba(200, 160, 255, 0.4)" }}
            onClick={closeTagModal}
          ></div>
          <div className="modal-content">
            <div className="box">
              <h3 className="title is-3">Manage Tags</h3>
              <ul>
                {tags.map((tag) => (
                  <li key={tag.id}>
                    <label>
                      <input
                        type="checkbox"
                        value={tag.id}
                        onChange={(e) => {
                          const selectedTag = parseInt(e.target.value);
                          handleTagSelection(selectedTag);
                        }}
                      />
                      {tag.label}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="field is-grouped is-grouped-centered mt-3">
                <div className="control">
                  <button
                    className="button is-success"
                    onClick={handleSaveTags}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={closeTagModal}
          ></button>
        </div>
      )}
    </>
  );
};

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById } from "../../managers/PostManager";
import { getAllTags } from "../../managers/TagManager";
import { createPostTag } from "../../managers/PostTagManager";

export const PostDetails = ({ token, currentUserId, staff }) => {
  const [post, setPost] = useState({});
  const [tags, setTags] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagModal, setShowTagModal] = useState(false);

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId, token).then((postObj) => {
      setPost(postObj);
    });
  }, [token, postId]);

  useEffect(() => {
    getAllTags(token).then((tagsArray) => {
      setTags(tagsArray);
    });
  }, [token]);

  const handleDelete = (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete tag?"
    );
    if (confirmDelete) {
      deletePost(token, postId).then(() => {
        navigate(`/posts/mine`);
      });
    }
  };

  const openTagModal = () => {
    setShowTagModal(true);
  };

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
      closeTagModal();
    } catch (error) {
      console.error("Error creating post tags:", error);
    }
  };

  return (
    <article className="columns is-centered mt-6">
      <div className="column is-three-fifths card has-background-link">
        <h2 className="title has-text-centered mt-4 has-text-white">
          {post.title}
        </h2>
        <div className="detail--container is-flex is-flex-direction-column m-5 px-6 py-5">
          {post.image_url ? (
            <img src={post.image_url} alt="header" className="card-image" />
          ) : (
            ""
          )}
          <div className="is-flex is-justify-content-space-between my-3">
            <div>{post.rare_user?.user.full_name}</div>
            <div className="content">{post.publication_date}</div>
          </div>
          <div className="content">{post.content}</div>
          <div className="is-flex is-justify-content-end">
            {currentUserId === post.rare_user?.user.id ? (
              <div className="tag--item">
                <i
                  className="fa-solid fa-gear fa-lg"
                  onClick={() => {
                    navigate(`/posts/update/${post.id}`);
                  }}
                ></i>
              </div>
            ) : (
              ""
            )}
            {currentUserId === post.rare_user?.user.id || staff ? (
              <div className="tag--item">
                <i
                  className="fa-solid fa-trash-can fa-lg"
                  onClick={() => handleDelete(post.id)}
                ></i>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="content">
          <strong className="has-text-white">Associated Tags:</strong>
          {post.post_tags && post.post_tags.length > 0 ? (
            <ul>
              {post.post_tags?.map((tag) => (
                <li className="has-text-white" key={tag.id}>{tag.label}</li>
              ))}
            </ul>
          ) : (
            <p className="has-text-white">No tags associated with this post.</p>
          )}
        </div>
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
                navigate(`/comments/all/${postId}`);
              }}
            >
              View Comments
            </button>
          </div>
          <div className="control">
            <button
              className="button is-success"
              onClick={() => {
                navigate(`/comments/new/${postId}`);
              }}
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
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
    </article>
  );
};

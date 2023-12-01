import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, getPostById } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";

export const UpdatePost = ({ token }) => {
  const [currentPost, setCurrentPost] = useState({});
  const [categories, setCategories] = useState([]);
  const [imageName, setImageName] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId, token).then((postObj) => {
      setCurrentPost(postObj);
    });
  }, [postId, token]);

  useEffect(() => {
    getAllCategories(token).then((catArr) => {
      setCategories(catArr);
    });
  }, []);

  const changePostState = (e) => {
    setCurrentPost({
      ...currentPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const post = {
      categoryId: currentPost.category.id
        ? currentPost.category.id
        : currentPost.category,
      title: currentPost.title,
      image_url: currentPost.image_url,
      content: currentPost.content,
    };

    editPost(post, postId, token).then(() => {
      navigate(`/posts/details/${postId}`);
    });
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      console.log("Base64 of file is", base64ImageString);

      setCurrentPost({
        ...currentPost,
        [event.target.name]: base64ImageString,
      });
    });

    setImageName(event.target.files[0].name);
  };

  return (
    <section className="columns is-centered mt-6">
      <form className="column is-two-thirds" onSubmit={handleSave}>
        <h2 className="title">Update Post</h2>
        <fieldset className="field">
          <label className="label">Category: </label>
          <div className="control">
            <div className="select">
              <select
                name="category"
                value={currentPost.category?.id}
                required
                autoFocus
                onChange={changePostState}
              >
                <option value={""}>Please select a category</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset className="field">
          <label className="label">Title: </label>
          <div className="control">
            <input
              type="text"
              name="title"
              required
              autoFocus
              className="input"
              value={currentPost.title}
              onChange={changePostState}
            />
          </div>
        </fieldset>
        <fieldset className="field">
          <div className="file has-name">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="image_url"
                onChange={createImageString}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a picture...</span>
              </span>
              <span className="file-name">
                {currentPost.image_url === null ? "No file chosen" : imageName}
              </span>
            </label>
          </div>
        </fieldset>
        <fieldset className="field">
          <label className="label">Content: </label>
          <div className="control">
            <input
              type="text"
              name="content"
              required
              autoFocus
              className="input"
              value={currentPost.content}
              onChange={changePostState}
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
                navigate(`/posts/mine`);
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

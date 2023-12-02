import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";

export const PostForm = ({ token }) => {
  const [newPost, setNewPost] = useState({ image_url: null });
  const [categories, setCategories] = useState([]);
  const [imageName, setImageName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories(token).then((catArr) => {
      setCategories(catArr);
    });
  }, []);

  const changePostState = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    let post = {
      categoryId: parseInt(newPost.category),
      title: newPost.title,
      image_url: newPost.image_url,
      content: newPost.content,
    };

    createPost(post, token).then((postObj) => {
      navigate(`/posts/details/${postObj["id"]}`);
    });
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      setNewPost({
        ...newPost,
        [event.target.name]: base64ImageString,
      });
    });

    setImageName(event.target.files[0].name);
  };

  return (
    <section className="columns is-centered my-6">
      <form className="column is-two-thirds" onSubmit={handleSave}>
        <h2 className="title">Add New Post</h2>
        <fieldset className="field">
          <label className="label">Category: </label>
          <div className="control">
            <div className="select">
              <select
                name="category"
                value={newPost.category?.id}
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
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="input"
            value={newPost.title}
            onChange={changePostState}
          />
        </fieldset>
        <fieldset>
          {newPost.image_url ? (
            <figure className="mb-3">
              <img
                src={newPost.image_url}
                alt="post-header"
                className="post--image"
              />
            </figure>
          ) : (
            ""
          )}
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
                {imageName === "" ? "No file chosen" : imageName}
              </span>
            </label>
          </div>
        </fieldset>
        <fieldset className="field">
          <label className="label">Content: </label>
          <input
            type="text"
            name="content"
            required
            autoFocus
            className="input"
            value={newPost.content}
            onChange={changePostState}
          />
        </fieldset>

        <div className="control">
          <button className="button is-success">Save</button>
        </div>
      </form>
    </section>
  );
};

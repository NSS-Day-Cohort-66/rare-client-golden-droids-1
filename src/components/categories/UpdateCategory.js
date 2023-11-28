import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editCategory, getCategoryById } from "../../managers/CategoryManager";
import "./Category.css";

export const UpdateCategory = ({ token }) => {
  const [currentCategory, setCurrentCategory] = useState({ label: "" });
  const { categoryId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getCategoryById(token, categoryId).then((categoryObj) => {
      setCurrentCategory(categoryObj);
    });
  }, [token, categoryId]);

  const changeCategoryState = (e) => {
    setCurrentCategory({
      ...currentCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    let category = {
      label: currentCategory.label,
    };

    editCategory(category, categoryId, token).then(() => {
      navigate(`/categories/all`);
    });
  };

  const displayForm = () => {
    return (
      <section className="columns is-centered mt-6">
        <form
          className="CategoryForm column is-two-thirds"
          onSubmit={handleSave}
        >
          <h2 className="CategoryForm__name title">Update Category</h2>
          <fieldset className="field">
            <div className="form-group">
              <label className="label">Label: </label>
              <div className="control">
                <input
                  type="text"
                  name="label"
                  required
                  autoFocus
                  className="input"
                  value={currentCategory.label}
                  onChange={changeCategoryState}
                />
              </div>
            </div>
          </fieldset>
          <div className="buttons--container field is-grouped">
            <div className="button--container control">
              <button
                type="submit"
                className="button is-success"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
            <div className="button--container">
              <button
                className="button is-danger is-light"
                onClick={() => {
                  navigate(`/categories/all`);
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

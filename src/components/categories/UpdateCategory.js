import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editCategory, getCategoryById } from "../../managers/CategoryManager";
import "./Category.css";

export const UpdateCategory = ({ token }) => {
  const [currentCategory, setCurrentCategory] = useState({label: ""});
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
      <form className="CategoryForm" onSubmit={handleSave}>
        <h2 className="CategoryForm__name">Update Category</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="label">Label: </label>
            <input
              type="text"
              name="label"
              required
              autoFocus
              className="form-control"
              value={currentCategory.label}
              onChange={changeCategoryState}
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
                navigate(`/categories/all`);
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

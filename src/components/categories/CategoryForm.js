import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../managers/CategoryManager";

export const CategoryForm = ({ token }) => {
  const initialCategoryState = {
    label: "",
  };

  const [category, updateCategoryProps] = useState(initialCategoryState);
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let newCategory = {
      label: category.label,
    };

    createCategory(newCategory, token).then(() => {
      navigate(`/categories/all`);
    });
  };

  return (
    <>
      <main className="container--create-category">
        <section className="columns is-centered mt-6">
          <form className="form--category column is-two-thirds">
            <h1 className="title">Create a Category</h1>
            <fieldset className="field">
              <label className="label">Category label:</label>
              <input
                id="category"
                type="text"
                onChange={(e) => {
                  const copy = { ...category };
                  copy.label = e.target.value;
                  updateCategoryProps(copy);
                }}
                className="input"
              />
            </fieldset>

            <fieldset>
              <button
                type="submit"
                onClick={handleSubmit}
                className="save-category-button button is-success"
              >
                Save
              </button>
            </fieldset>
          </form>
        </section>
      </main>
    </>
  );
};

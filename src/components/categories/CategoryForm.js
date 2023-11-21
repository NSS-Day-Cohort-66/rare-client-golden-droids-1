import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../managers/CategoryManager";

export const CategoryForm = ({token}) => {

    const initialCategoryState = {
        label: ""
    }

    const [category, updateCategoryProps] = useState(initialCategoryState)
    const navigate = useNavigate()

    const handleSubmit = (evt) => {
        evt.preventDefault()

        let newCategory = {
            label: category.label
        }

        createCategory(newCategory, token).then(() => {
            navigate(`/categories`)
        })
    }
  
    return (
    <>
      <main className="container--create-category">
        <section>
            <form className="form--category">
                <h1 className="">Create a Category</h1>
                <fieldset>
                    <label htmlFor="category">Category label:</label>
                    <input id="category" type="text"
                    onChange={e => {
                        const copy = { ...category }
                        copy.label = e.target.value
                        updateCategoryProps(copy)
                    }}
                    className="form-control" />
                </fieldset>

                <fieldset>
                    <button type="submit"
                    onClick={handleSubmit}
                    className="save-category-button">Save</button>
                </fieldset>
            </form>
        </section>
      </main>
    </>
  );
};

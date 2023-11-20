import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CategoryForm = ({token}) => {

    const initialCategoryState = {
        label: ""
    }

    const [category, updateCategoryProps] = useState(initialCategoryState)
    const navigate = useNavigate()

    const createCategory = async (evt) => {
        evt.preventDefault()

        await fetch("http://localhost:8000/categories", {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })

        await navigate("/categories")
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
                    onClick={createCategory}
                    className="save-category-button">Save</button>
                </fieldset>
            </form>
        </section>
      </main>
    </>
  );
};

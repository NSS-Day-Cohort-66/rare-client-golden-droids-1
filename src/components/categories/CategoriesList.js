import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../managers/CategoryManager";
import { useEffect, useState } from "react";

export const CategoriesList = ({token}) => {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories(token).then((categoryArray) => {
      setCategories(categoryArray)
    })
  }, [token])

  return (
    <>
      <div>
        <h1>Categories List</h1>
        <div>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <h3>{category.label}</h3>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => {
            navigate("/create_category");
          }}
        >
          Create Category
        </button>
      </div>
    </>
  );
};

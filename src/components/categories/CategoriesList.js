import { Link, useNavigate } from "react-router-dom";
import {
  deleteCategory,
  getAllCategories,
} from "../../managers/CategoryManager";
import { useEffect, useState } from "react";
import "./Category.css";

export const CategoriesList = ({ token, staff }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = () => {
    getAllCategories(token).then((catArray) => {
      setCategories(catArray);
    });
  };

  useEffect(() => {
    getAllCategories(token).then((categoryArray) => {
      setCategories(categoryArray);
    });
  }, [token]);

  const handleDelete = (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this category?"
    );
    if (confirmDelete) {
      deleteCategory(token, categoryId).then(() => {
        fetchCategories();
      });
    }
  };

  return (
    <>
      <div>
        <h1>Categories List</h1>
        <div>
          <ul>
            {categories.map((category) => (
              <div className="category--container" key={category.id}>
                {staff ? (
                  <>
                    <div className="category--item">
                      <i
                        className="fa-solid fa-gear fa-lg edit-icon"
                        onClick={() => {
                          navigate(`/categories/update/${category.id}`);
                        }}
                      ></i>
                    </div>
                    <div className="category--item">
                      <i
                        className="fa-solid fa-trash-can fa-lg delete-icon"
                        onClick={() => handleDelete(category.id)}
                      ></i>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="category--item">{category.label}</div>
              </div>
            ))}
          </ul>
        </div>
        <button className="submit-button">
          <Link to="/categories/create">Create Category</Link>
        </button>
      </div>
    </>
  );
};

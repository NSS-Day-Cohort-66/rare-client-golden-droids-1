import { useNavigate } from "react-router-dom";

export const CategoriesList = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
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

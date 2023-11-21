import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { MyPosts } from "../components/posts/MyPosts";
import { CommentForm } from "../components/comments/CommentForm";
import { CategoriesList } from "../components/categories/CategoriesList";
import { CategoryForm } from "../components/categories/CategoryForm";
import { TagList } from "../components/tags/TagList";
import { UpdateTag } from "../components/tags/UpdateTag";
import { TagForm } from "../components/tags/TagForm";

export const ApplicationViews = ({ token, setToken, staff, setStaff }) => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} setStaff={setStaff} />}
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/" element="Hello" />
          <Route path="/my_posts" element={<MyPosts token={token} />} />
          <Route
            path="/categories"
            element={<CategoriesList token={token} />}
          />
          <Route
            path="/create_category"
            element={<CategoryForm token={token} />}
          />
          <Route path="comments">
            {/* //TODO the path for CommentForm should be new/:postId */}
            <Route path="new" element={<CommentForm token={token} />} />
          </Route>
          <Route path="tags">
            <Route
              path="all"
              element={<TagList token={token} staff={staff} />}
            />
            <Route
              path="update/:tagId"
              element={<UpdateTag token={token} staff={staff} />}
            />
          </Route>
          <Route path="/create-tag" element={<TagForm token={token} />} />
        </Route>
      </Routes>
    </>
  );
};

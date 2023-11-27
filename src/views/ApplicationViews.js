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
import { UpdateCategory } from "../components/categories/UpdateCategory";
import { AllPosts } from "../components/posts/AllPosts";

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
          <Route path="/all_posts" element={<AllPosts token={token} />} />
          <Route path="/my_posts" element={<MyPosts token={token} />} />
          <Route
            path="/categories"
            element={<CategoriesList token={token} />}
          />
          <Route
            path="all"
            element={<CategoriesList token={token} staff={staff} />}
          />
          <Route path="create" element={<CategoryForm token={token} />} />
          <Route
            path="update/:categoryId"
            element={<UpdateCategory token={token} />}
          />
        </Route>

        <Route path="comments">
          {/* //TODO the path for CommentForm should be new/:postId */}
          <Route path="new" element={<CommentForm token={token} />} />
        </Route>
        <Route path="tags">
          <Route path="all" element={<TagList token={token} staff={staff} />} />
          <Route path="update/:tagId" element={<UpdateTag token={token} />} />
          <Route path="create" element={<TagForm token={token} />} />
        </Route>
      </Routes>
    </>
  );
};

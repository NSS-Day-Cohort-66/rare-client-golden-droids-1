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
import { CommentList } from "../components/comments/CommentList";
import { UpdateCategory } from "../components/categories/UpdateCategory";
import { AllPosts } from "../components/posts/AllPosts";
import { PostDetails } from "../components/posts/PostDetails";
import { UpdatePost } from "../components/posts/UpdatePost";
import { PostForm } from "../components/posts/PostForm";

export const ApplicationViews = ({
  token,
  setToken,
  staff,
  setStaff,
  currentUserId,
}) => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} setStaff={setStaff} />}
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/" element="Work in progress..." />
          <Route path="posts">
            <Route path="all" element={<AllPosts token={token} />} />
            <Route path="mine" element={<MyPosts token={token} />} />
            <Route
              path="details/:postId"
              element={
                <PostDetails
                  token={token}
                  currentUserId={currentUserId}
                  staff={staff}
                />
              }
            />
            <Route path="new" element={<PostForm token={token} />} />
            <Route
              path="update/:postId"
              element={
                <UpdatePost token={token} currentUserId={currentUserId} />
              }
            />
          </Route>
          <Route path="categories">
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
            <Route path="new/:postId" element={<CommentForm token={token} />} />
            <Route
              path="all/:postId"
              element={
                // prop drilling currentUserId from Rare.js to be used in CommentList to only display delete button to owner of comment
                <CommentList
                  token={token}
                  currentUserId={currentUserId}
                  staff={staff}
                />
              }
            />
          </Route>
          <Route path="tags">
            <Route
              path="all"
              element={<TagList token={token} staff={staff} />}
            />
            <Route path="update/:tagId" element={<UpdateTag token={token} />} />
            <Route path="create" element={<TagForm token={token} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { CommentForm } from "../components/comments/CommentForm";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="comments">
            {/* //TODO the path for CommentForm should be new/:postId */}
            <Route path="new" element={<CommentForm token={token} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

import { useEffect, useState } from "react";
import { getCommentsByPostId } from "../../managers/CommentManager";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../../managers/PostsManager";

export const CommentList = ({ token }) => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    getCommentsByPostId(token, postId).then((commentArr) => {
      setComments(commentArr);
    });

    getPostById(postId, token).then((postObj) => {
      setPost(postObj);
    });
  }, [token, postId]);

  const displayComments = () => {
    if (comments && comments.length) {
      return comments.map((comment) => (
        <div className="comment--container" key={comment.id}>
          <div className="comment--item">{comment.author.user.full_name}</div>
          <div className="comment--item">{comment.created_on}</div>
          <div className="comment--item">{comment.content}</div>
        </div>
      ));
    }
  };

  return (
    <article className="columns is-centered mt-6">
      <div className="column is-one-fifth">
        <h2 className="title has-text-centered">{post.title}</h2>
        <div className="card p-3">{displayComments()}</div>
        <div className="is-flex is-justify-content-center mt-6">
          <Link to="/post_details">Back to Post</Link>
        </div>
      </div>
    </article>
  );
};

import { useEffect, useState } from "react";
import { getCommentsByPostId } from "../../managers/CommentManager";
import { Link, useParams } from "react-router-dom";

export const CommentList = ({ token }) => {
  const [comments, setComments] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    getCommentsByPostId(token, postId).then((commentArr) => {
      setComments(commentArr);
    });
  }, [token, postId]);

  const displayComments = () => {
    if (comments && comments.length) {
      return comments.map((comment) => (
        <div className="comment--container" key={comment.id}>
          <div>{comment.author.user.full_name}</div>
          <div>{comment.created_on}</div>
          <div>{comment.content}</div>
        </div>
      ));
    }
  };

  return (
    <article>
      <div>
        <h2>Post Title Goes Here</h2>
        <div>{displayComments()}</div>
        <Link>Back to Post</Link>
      </div>
    </article>
  );
};

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
        <h2>{post.title}</h2>
        <div>{displayComments()}</div>
        <Link>Back to Post</Link>
      </div>
    </article>
  );
};

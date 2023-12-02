import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById } from "../../managers/PostManager";
import { PostTagList } from "./PostTagList";
import { TagModal } from "./TagModal";

export const PostDetails = ({ token, currentUserId, staff }) => {
  const [post, setPost] = useState({});
  const [showTagModal, setShowTagModal] = useState(false);

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId, token).then((postObj) => {
      setPost(postObj);
    });
  }, [token, postId]);

  const handleDelete = (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete post?"
    );
    if (confirmDelete) {
      deletePost(token, postId).then(() => {
        navigate(`/posts/mine`);
      });
    }
  };

  return (
    <article className="columns is-centered my-6">
      <div className="column is-three-fifths card has-background-link">
        <h2 className="title has-text-centered mt-4 has-text-white">
          {post.title}
        </h2>
        <div className="detail--container is-flex is-flex-direction-column m-5 px-6 py-5">
          <div className="card-image">
            <figure className="image">
              {post.image_url ? <img src={post.image_url} alt="header" /> : ""}
            </figure>
          </div>
          <div className="is-flex is-justify-content-space-between my-3">
            <div>{post.rare_user?.user.full_name}</div>
            <div className="content">{post.publication_date}</div>
          </div>
          <div className="content">{post.content}</div>
          <div className="is-flex is-justify-content-end">
            {currentUserId === post.rare_user?.user.id ? (
              <div className="tag--item">
                <i
                  className="fa-solid fa-gear fa-lg"
                  onClick={() => {
                    navigate(`/posts/update/${post.id}`);
                  }}
                ></i>
              </div>
            ) : (
              ""
            )}
            {currentUserId === post.rare_user?.user.id || staff ? (
              <div className="tag--item">
                <i
                  className="fa-solid fa-trash-can fa-lg"
                  onClick={() => handleDelete(post.id)}
                ></i>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {
          <PostTagList
            post={post}
            token={token}
            currentUserId={currentUserId}
            setShowTagModal={setShowTagModal}
          />
        }
      </div>
      {
        <TagModal
          token={token}
          postId={postId}
          setPost={setPost}
          post={post}
          setShowTagModal={setShowTagModal}
          showTagModal={showTagModal}
        />
      }
    </article>
  );
};

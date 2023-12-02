import { PostDetailButtons } from "./PostDetailButtons";

export const PostTagList = ({ post, currentUserId, setShowTagModal }) => {
  return (
    <>
      <div className="content">
        <strong className="has-text-white">Associated Tags:</strong>
        {post.post_tags && post.post_tags.length > 0 ? (
          <ul>
            {post.post_tags?.map((tag) => (
              <li className="has-text-white" key={tag.id}>
                {tag.label}
              </li>
            ))}
          </ul>
        ) : (
          <p className="has-text-white">No tags associated with this post.</p>
        )}
      </div>
      {
        <PostDetailButtons
          currentUserId={currentUserId}
          post={post}
          setShowTagModal={setShowTagModal}
        />
      }
    </>
  );
};

import "./Feed.css";
import { PostsContext } from "../Context/PostsContext ";
import NewPost from "./newPost";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

const Feed = () => {
  const { posts, setPosts } = useContext(PostsContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);

  const openNewPostDialog = () => {
    setShowNewPostDialog(true);
  };

  const closeNewPostDialog = () => {
    setShowNewPostDialog(false);
  };

  // Filter posts based on the search term
  const filteredPosts = searchTerm
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;

  const addNewPost = (newPost) => {
    const postId = newPost.get("id");
    const title = newPost.get("title");
    const images = newPost.getAll("images");
    const imagesURL = images.map((image) => URL.createObjectURL(image));

    const author = newPost.get("author");
    const user = newPost.get("user");
    const publishDate = newPost.get("publishDate");
    const postDate = newPost.get("postDate");
    const description = newPost.get("description");
    const userId = newPost.get("userId");

    const postToAdd = {
      id: postId,
      title: title,
      images: imagesURL,
      author: author,
      user: user,
      publishDate: publishDate,
      postDate: postDate,
      description: description,
      userId: userId,
    };
    setPosts([...posts, postToAdd]);
    setShowNewPostDialog(false);
  };

  return (
    <div className="content">
      <div className="post-header">
        <h3>Posts</h3>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="By Book Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={openNewPostDialog}>
          <FaPlus /> Add New Post
        </button>
      </div>
      {showNewPostDialog && (
        <NewPost onClose={closeNewPostDialog} onAddPost={addNewPost} />
      )}
      <div className="posts">
        {filteredPosts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id} className="card-link">
            <div className="card">
              <img src={post.images[0]} alt={post.title} />
              <div className="card-content">
                <h3>{post.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feed;

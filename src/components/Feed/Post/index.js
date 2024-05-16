import { useState, useContext } from "react";
import { PostsContext } from "../../Context/PostsContext ";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./post.css";

const PostPage = () => {
  const { posts } = useContext(PostsContext);

  const { postId } = useParams(); // Extracting post ID from URL params
  const post = posts.find((post) => post.id === parseInt(postId)); // Find post by postId

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullView, setIsFullView] = useState(false);

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  };

  const handlePreviousImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + post.images.length) % post.images.length
    );
  };

  const handleGoBack = (e) => {
    e.stopPropagation();
    window.history.back();
  };

  const handleToggleFullView = () => {
    setIsFullView(!isFullView);
  };

  if (!post) {
    return <div>Loading...</div>; // edit on fetch data
  }

  return (
    <div className="post-page">
      <div className="postHead">
        <button onClick={(e) => handleGoBack(e)} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="postInfo">
          <p> {post.user}</p>
          <p> {post.postDate}</p>
        </div>
      </div>
      <div
        className={`image-container ${isFullView ? "full-view" : ""}`}
        onClick={handleToggleFullView}
      >
        {post.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={post.title}
            className={index === currentImageIndex ? "" : "hidden"}
          />
        ))}
        <button
          onClick={(e) => handlePreviousImage(e)}
          className="slide-button previous"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          onClick={(e) => handleNextImage(e)}
          className="slide-button next"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <h1>{post.title}</h1>
      <p>Description: {post.description}</p>
    </div>
  );
};

export default PostPage;

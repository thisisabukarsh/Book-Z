import { useState, useContext, useEffect } from "react";
import { PostsContext } from "../../Context/PostsContext ";
import UserContext from "../../Context/UserContext";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./post.css";

const PostPage = () => {
  const { posts, setPosts, request, setRequest } = useContext(PostsContext);
  const { userData } = useContext(UserContext);
  const { user } = userData;

  const { postId } = useParams(); // Extracting post ID from URL params
  const post = posts.find((post) => post.id === parseInt(postId)); // Find post by postId

  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullView, setIsFullView] = useState(false);

  // const handleNextImage = (e) => {
  //   e.stopPropagation();
  //   setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  // };

  // const handlePreviousImage = (e) => {
  //   e.stopPropagation();
  //   setCurrentImageIndex(
  //     (prevIndex) => (prevIndex - 1 + post.images.length) % post.images.length
  //   );
  // };

  const handleGoBack = (e) => {
    e.stopPropagation();
    window.history.back();
  };

  const handleToggleFullView = () => {
    setIsFullView(!isFullView);
  };

  // const [isRequestPending, setIsRequestPending] = useState(false);

  // useEffect(() => {
  //   // Find the user's request
  //   const userRequest = request.find((req) => req.requesterId === user.userId);

  //   // Check if request status is pending or not
  //   if (userRequest && userRequest.status === "pending") {
  //     setIsRequestPending(true);
  //   } else {
  //     setIsRequestPending(false);
  //   }
  // }, [request, user]);

  // const handleRequestBook = () => {
  //   setIsRequestPending(true);
  //   const newRequest = {
  //     reqId: Date.now(),
  //     publisherId: post.userId,
  //     postId: post.Id,
  //     status: "pending",
  //     requesterId: user.userId,
  //   };
  //   setRequest([...request, newRequest]);
  // };

  if (!post) {
    return <div>Loading...</div>;
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
        {/* {post.images.map((image, index) => ( */}
        <img
          // key={index}
          src={post.image}
          alt={post.title}
          // className={index === currentImageIndex ? "" : "hidden"}
        />
        {/* ))} */}
        {/* <button
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
        </button> */}
      </div>
      <h1>{post.title}</h1>
      <p>Description: {post.description}</p>
      <a
        href={`https://wa.me/${post.userNumber}?text=Hello%20World`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="btn-whatsApp">Chat in WhatsApp</button>
      </a>
    </div>
  );
};

export default PostPage;

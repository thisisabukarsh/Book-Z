import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import NewPost from "../Feed/newPost";
import ResetPasswordDialog from "./Dialogs/ResetPasswordDialog";
import EditUserInfoDialog from "./Dialogs/EditUserInfoDialog";
import EditPostDialog from "./Dialogs/EditPostDialog";
import { FaEdit, FaPlus, FaKey, FaTrash } from "react-icons/fa";
import { PostsContext } from "../Context/PostsContext ";
import UserContext from "../Context/UserContext";
import Logout from "../Login&SignUp/Logout/Logout";
import defaultPhoto from "../../assets/default.png";
import "./profile.css";

const Profile = () => {
  const { userData } = useContext(UserContext);
  const { isAuthenticated, user } = userData;

  const { posts, setPosts } = useContext(PostsContext);
  const [profilePhoto, setProfilePhoto] = useState(() => {
    const savedPhoto = user.image;
    return savedPhoto ? savedPhoto : defaultPhoto;
  });

  // const [userPosts, setUserPosts] = useState([]);

  // // Check if user.books is not null or undefined before setting the state
  // if (user.books) {
  //   setUserPosts(user.books);
  // } else {
  //   // Handle the case when user.books is null or undefined
  //   // For example, set userPosts to an empty array
  //   setUserPosts([]);
  // }

  // useEffect(() => {
  //   const updatedUserPosts =
  //     user && user.id
  //       ? posts.filter((post) => post.userId === user.userId)
  //       : [];
  //   setUserPosts(updatedUserPosts);
  // }, [posts, user]);

  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showEditUserInfoDialog, setShowEditUserInfoDialog] = useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);

  const openDialog = (dialog, post) => {
    switch (dialog) {
      case "newPost":
        setShowNewPostDialog(true);
        break;
      case "editUserInfo":
        setShowEditUserInfoDialog(true);
        break;
      case "resetPassword":
        setShowResetPasswordDialog(true);
        break;
      case "editPost":
        setShowEditPostDialog(true);
        setEditingPost(post);
        break;
      default:
        break;
    }
  };

  const closeDialog = (dialog) => {
    switch (dialog) {
      case "newPost":
        setShowNewPostDialog(false);
        break;
      case "editUserInfo":
        setShowEditUserInfoDialog(false);
        break;
      case "resetPassword":
        setShowResetPasswordDialog(false);
        break;
      case "editPost":
        setShowEditPostDialog(false);
        break;
      default:
        break;
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== parseInt(postId)));
  };

  const addNewPost = async (newPost) => {
    // const postToAdd = {
    //   id: newPost.id,
    //   title: newPost.title,
    //   image: newPost.image,
    //   description: newPost.description,
    //   condition: "LikeNew",
    //   userId: newPost.userId,
    // };

    // setPosts((prevPosts) => [...prevPosts, postToAdd]);
    // setUserPosts((prevUserPosts) => [...prevUserPosts, postToAdd]);
    setShowNewPostDialog(false);
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newProfilePhotoURL = reader.result;
        setProfilePhoto(newProfilePhotoURL);
        localStorage.setItem("profilePhoto", newProfilePhotoURL);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="profile">
          <div className="profile-info">
            <div className="profile-photo">
              <img src={profilePhoto} alt="Profile" />
              <input
                type="file"
                accept="image/*"
                id="upload-photo"
                style={{ display: "none" }}
                onChange={handleProfilePhotoChange}
              />
              <label
                htmlFor="upload-photo"
                style={{
                  color: "#64748b",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                <FaEdit className="edit-icon" /> Upload New Photo
              </label>
            </div>
            <div className="info">
              <h2>{user.username}</h2>
              <p>Phone: {user.phoneNumber}</p>
              <p>Email: {user.email}</p>
              <p>Rating: {user.averageRating} / 5</p>
              <div className="buttons">
                <button onClick={() => openDialog("editUserInfo")}>
                  <FaEdit /> Edit Your Info
                </button>
                <button onClick={() => openDialog("resetPassword")}>
                  <FaKey /> Reset Password
                </button>
                <Logout />
              </div>
            </div>
          </div>
          <hr />
          {showEditPostDialog && (
            <EditPostDialog
              post={editingPost}
              onClose={() => closeDialog("editPost")}
              onUpdatePost={(updatedPost) => {
                // setPosts((prevPosts) =>
                //   prevPosts.map((post) =>
                //     post.id === updatedPost.id ? updatedPost : post
                //   )
                // );
                // setUserPosts((prevUserPosts) =>
                //   prevUserPosts.map((post) =>
                //     post.id === updatedPost.id ? updatedPost : post
                //   )
                // );
                closeDialog("editPost");
              }}
            />
          )}
          {showNewPostDialog && (
            <NewPost
              onClose={() => closeDialog("newPost")}
              onAddPost={addNewPost}
            />
          )}
          {showEditUserInfoDialog && (
            <EditUserInfoDialog onClose={() => closeDialog("editUserInfo")} />
          )}
          {showResetPasswordDialog && (
            <ResetPasswordDialog onClose={() => closeDialog("resetPassword")} />
          )}
          <div className="container">
            <div className="post-header">
              <h3>Posts</h3>
              <button onClick={() => openDialog("newPost")}>
                <FaPlus /> Add New Post
              </button>
            </div>
            <div className="posts">
              {user.books.length === 0 ? (
                <p>You haven't added any books yet.</p>
              ) : (
                user.books.map((post) => (
                  <div className="card" key={post.id}>
                    <Link to={`/post/${post.id}`} className="card-link">
                      <img src={post.image} alt={post.title} />
                    </Link>
                    <div className="card-content">
                      <div className="post-buttons">
                        <button onClick={() => openDialog("editPost", post)}>
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeletePost(post.id)}>
                          <FaTrash />
                        </button>
                      </div>
                      <h3>{post.title}</h3>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>You need to be logged in to view this page.</p>
      )}
    </>
  );
};

export default Profile;

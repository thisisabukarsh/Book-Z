import React, { useState, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import UserContext from "../../Context/UserContext";
import "./newPost.css";

const NewPost = ({ onClose, onAddPost }) => {
  const { userData } = useContext(UserContext);
  const { user } = userData;

  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      // Update images state with the data URL of the uploaded image
      setImages([...images, event.target.result]);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const id = Date.now();
    formData.append("id", id);
    formData.append("title", title);
    images.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    formData.append("user", user.userName);
    formData.append("userId", user.userId);

    const fullDate = new Date();
    const day = fullDate.getDate();
    const month = fullDate.getMonth() + 1;
    const year = fullDate.getFullYear();
    const postDate = `${day}/${month}/${year}`;
    formData.append("postDate", postDate);
    formData.append("description", description);

    onAddPost(formData);
    setTitle("");
    setImages([]);
    setDescription("");
  };

  return (
    <div className="new-post-modal">
      <div className="new-post-content">
        <div className="popup-header">
          <h2>Add New Post</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Book Name:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
          <label htmlFor="images">Upload Images:</label>
          <input
            type="file"
            id="images"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;

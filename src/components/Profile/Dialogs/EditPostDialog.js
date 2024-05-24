import "./dialog.css";
import React, { useState } from "react";

const EditPostDialog = ({ post, onClose, onUpdatePost }) => {
  // State variables to hold the edited post data
  const [editedTitle, setEditedTitle] = useState(post ? post.title : "");
  const [editedImage, setEditedImage] = useState(null);
  const [editedDescription, setEditedDescription] = useState(
    post ? post.description : ""
  );

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the updated post object
    const updatedPost = {
      ...post,
      title: editedTitle,
      image: editedImage,
      description: editedDescription,
    };
    onUpdatePost(updatedPost); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setEditedImage(file);
  };

  return (
    <div className="dialog">
      <div className="dialog-content">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            multiple
            required
            onChange={handleImageChange}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          ></textarea>
          <div className="buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostDialog;

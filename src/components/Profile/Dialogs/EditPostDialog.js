import "./dialog.css";
import React, { useState } from "react";

const EditPostDialog = ({ post, onClose, onUpdatePost }) => {
  // State variables to hold the edited post data
  const [editedTitle, setEditedTitle] = useState(post ? post.title : "");
  const [editedImages, setEditedImages] = useState(post ? post.images : []);
  const [editedAuthor, setEditedAuthor] = useState(post ? post.author : "");
  const [editedPublishDate, setEditedPublishDate] = useState(
    post ? post.publishDate : ""
  );
  const [editedDescription, setEditedDescription] = useState(
    post ? post.description : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the updated post object
    const updatedPost = {
      ...post,
      title: editedTitle,
      images: editedImages,
      author: editedAuthor,
      publishDate: editedPublishDate,
      description: editedDescription,
    };
    onUpdatePost(updatedPost);
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
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            required
            onChange={(e) => setEditedImages(e.target.value)}
          />
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
          />
          <label htmlFor="publishDate">Publish Date:</label>
          <input
            type="text"
            id="publishDate"
            value={editedPublishDate}
            onChange={(e) => setEditedPublishDate(e.target.value)}
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

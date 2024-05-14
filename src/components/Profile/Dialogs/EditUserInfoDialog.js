import React, { useState, useContext } from "react";
import UserContext from "../../Context/UserContext";
import "./dialog.css";

const EditUserInfoDialog = ({ onClose }) => {
  const [newUserInfo, setNewUserInfo] = useState({
    // Initialize with current user info
    userName: "",
    phoneNumber: "",
    email: "",
  });

  const { userData, setUserData } = useContext(UserContext);
  const { user } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user info in context and local storage
    const updatedUser = { ...user, ...newUserInfo };
    setUserData({ ...userData, user: updatedUser });
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...userData, user: updatedUser })
    );

    // Close the dialog
    onClose();
  };

  return (
    <div className="dialog">
      <div className="dialog-content">
        <h2>Edit Your Info</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={newUserInfo.userName}
            onChange={handleChange}
          />
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={newUserInfo.phoneNumber}
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={newUserInfo.email}
            onChange={handleChange}
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserInfoDialog;

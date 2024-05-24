import React, { useState, useContext } from "react";
import api from "../../../api/axios";
import UserContext from "../../Context/UserContext";
import "./dialog.css";

const EditUserInfoDialog = ({ onClose }) => {
  
  const { userData, setUserData } = useContext(UserContext);
  const { user } = userData;
  
  const [newUserInfo, setNewUserInfo] = useState({
    // Initialize with current user info
    username: user.username,
    phoneNumber: user.phoneNumber,
    email: user.email,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/users/update/${user.userId}`, newUserInfo, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 204) { // No Content
        const updatedUser = response.data;
        setUserData({ ...userData, user: updatedUser });
        localStorage.setItem("userData", JSON.stringify({ ...userData, user: updatedUser }));
        onClose();
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
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
            value={newUserInfo.username}
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

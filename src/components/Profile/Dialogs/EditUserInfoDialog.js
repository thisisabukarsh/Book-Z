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
  const Edit_URL = `http://localhost:8081/patch/${user.userId}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = { ...user, ...newUserInfo };

    // Update user info in context and local storage
    setUserData({ ...userData, user: updatedUser });
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...userData, user: updatedUser })
    );

    // Close the dialog
    onClose();
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const updatedUserString = JSON.stringify(newUserInfo); // Convert to string
  //     const response = await fetch(Edit_URL, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: updatedUserString, // Send as a string
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       const returnedUser = await response.json();
  //       setUserData({ ...userData, user: returnedUser });
  //       localStorage.setItem(
  //         "userData",
  //         JSON.stringify({ ...userData, user: returnedUser })
  //       );
  //       onClose();
  //     } else {
  //       const errorData = await response.json();
  //       console.error("Error updating user:", errorData);
  //     }
  //   } catch (error) {
  //     console.error("Network error:", error);
  //   }
  // };

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

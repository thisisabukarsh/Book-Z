import React, { useState, useContext } from "react";
import UserContext from "../../Context/UserContext";
import "./dialog.css";

const ResetPasswordDialog = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userData, resetPassword } = useContext(UserContext);
  const { user } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") setCurrentPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPassword !== user.password) {
      alert("Current password is incorrect");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    resetPassword(newPassword);
    onClose();
  };

  return (
    <div className="dialog">
      <div className="dialog-content">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label>Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
          />
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Reset Password</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordDialog;

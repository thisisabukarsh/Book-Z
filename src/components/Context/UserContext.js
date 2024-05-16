import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Initialize userData from local storage or defaults
    const storedUserData = localStorage.getItem("userData");
    return storedUserData
      ? JSON.parse(storedUserData)
      : { isAuthenticated: false, user: null };
  });

  useEffect(() => {
    // Save userData to local storage whenever it changes
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const login = (user) => {
    // Update context and local storage upon login
    setUserData({ isAuthenticated: true, user });
  };

  const logout = () => {
    // Clear context and local storage upon logout
    setUserData({ isAuthenticated: false, user: null });
  };

  const resetPassword = (newPassword) => {
    // Update user's password in context and local storage
    setUserData((prevUserData) => ({
      ...prevUserData,
      user: { ...prevUserData.user, password: newPassword },
    }));
  };

  return (
    <UserContext.Provider
      value={{ userData, setUserData, resetPassword, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

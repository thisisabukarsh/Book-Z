import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Nav from "./Nav";
import profilePic from "../../assets/default.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (
      currentPath === "/login" ||
      currentPath === "/signup" ||
      currentPath === "/"
    ) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [currentPath]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className={`header ${isVisible ? "header-main" : ""} `}>
      {/* <div className="container"> */}
      <div className="logo">Z-Book</div>
      <Nav />
      <div
        className="links"
        onClick={(e) => {
          toggleMenu();
          e.stopPropagation();
        }}
      >
        <span className="icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
        {isMenuOpen && (
          <ul>
            <li>
              <Link to="/home/posts">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        )}
      </div>
      {/* <div className="profile-logo">
        <img src={profilePic} alt="Profile" className="profile-pic" />
      </div> */}
      {/* </div> */}
    </header>
  );
};

export default Header;

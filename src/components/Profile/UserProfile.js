import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import defaultPhoto from "../../assets/default.png";
import "./UserProfile.css";
import api from "../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RateDialog from "./Dialogs/RatingDialog";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false);
  const serverBaseUrl = "http://localhost:5050";

  const [profilePhoto, setProfilePhoto] = useState(defaultPhoto);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (user && user.image) {
      setProfilePhoto(user.image);
    }
  }, [user]);

  const handleRateUser = (ratingData) => {
    // Handle rating submission logic here, for example, sending it to the server
    console.log("Rating data:", ratingData);
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  const handleGoBack = (e) => {
    e.stopPropagation();
    window.history.back();
  };

  return (
    <div className="profile-v">
      <div className="profile-info">
        <button onClick={(e) => handleGoBack(e)} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="profile-photo">
          <img src={`${serverBaseUrl}${profilePhoto}`} alt="Profile" />
        </div>
        <div className="info">
          <h2>{user.username}</h2>
          <p>Phone: {user.phoneNumber}</p>
          <p>Email: {user.email}</p>
          <p>Rating: {user.averageRating} / 5</p>
          <div className="buttons">
            <button onClick={() => setIsRateDialogOpen(true)}>
              Rate <span>{user.username}</span>
            </button>
          </div>
        </div>
      </div>

      <RateDialog
        isOpen={isRateDialogOpen}
        onRequestClose={() => setIsRateDialogOpen(false)}
        onSubmit={handleRateUser}
      />
    </div>
  );
};

export default UserProfile;

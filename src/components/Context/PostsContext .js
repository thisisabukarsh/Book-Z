import React, { createContext, useState, useContext } from "react";
import api from "../../api/axios";
import { useEffect } from "react";
import UserContext from "./UserContext";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const { userData } = useContext(UserContext);
  const { user, isAuthenticated } = userData;

  const [posts, setPosts] = useState([]);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
      }
      if (isAuthenticated) {
        try {
          const response = await api.get(`users/withall/${user.id}`);
          setUserPosts(response.data.books);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      }
    };

    fetchBooks();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, setPosts, userPosts, setUserPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

import React, { createContext, useState } from "react";
// import { postData } from "../Feed/postsData";
import api from "../../api/axios";
import { useEffect } from "react";
import { requestData } from "../Feed/Post/requestData";

export const PostsContext = createContext();
export const getBooks = async () => {
  try {
    const response = await api.get("/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [request, setRequest] = useState(requestData);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setPosts(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, setPosts, request, setRequest }}>
      {children}
    </PostsContext.Provider>
  );
};

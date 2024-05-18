import React, { createContext, useState } from "react";
import { postData } from "../Feed/postsData";
import { requestData } from "../Feed/Post/requestData";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(postData);
  const [request, setRequest] = useState(requestData);

  return (
    <PostsContext.Provider value={{ posts, setPosts, request, setRequest }}>
      {children}
    </PostsContext.Provider>
  );
};

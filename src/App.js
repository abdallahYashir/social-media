import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUsers = axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const getPosts = axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const getComments = axios.get(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const [usersResponse, postsResponse, commentsResponse] =
          await Promise.all([getUsers, getPosts, getComments]);
        setUsers(usersResponse.data);
        setPosts(postsResponse.data);
        setComments(commentsResponse.data);

        mapData(users, posts, comments);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [comments, posts, users]);

  const mapData = (users, posts, comments) => {
    const mapped = posts.map((p) => {
      const post = p;
      post.comments = comments.filter((c) => c.postId === p.id);
      post.user = users.find((u) => u.id === post.userId);
      return post;
    });
    setData(mapped);
  };

  return <div className="App">{JSON.stringify(data)}</div>;
}

export default App;

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import './main.css'

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3028/getPosts");
        setPosts(response.data.posts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error get posts", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(posts);

  if (isLoading) {
    return <div> Loading...</div>;
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div> No posts available!</div>;
  }
  return (
    <div className="container-main">
      <div className="text-center">
      <h3> Total post: {posts.length} </h3>
      </div>
        <div className="row justify-content-between">
      <ul>
        {posts.map((post) => {
          return (
            <div key={post._id} className="card g-2">
            <li >
              <h5> {post.title} </h5>
              <h6> {post.author.name} </h6>
              <img src={post.cover} alt="img" />
              <p> {post.category} </p>
              <a href={post.content}>Link</a>
              <p> {post.readTime} </p>
            </li>
            </div>
          );
        })}
      </ul>
      </div>
    </div>
  );
};

export default Main;

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./main.css";
import UpdateCoverForm from "../Form/FormUpdateCover";
// import { Link } from "react-router-dom";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (postId) => {
    // setSelectedPost(postId);
    setSelectedPost((prevSelectedPost) =>
    prevSelectedPost === postId ? null : postId)
  };
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/getPosts`
      );
      setPosts(response.data.posts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error get posts", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCoverUpdate = async () => {
    await fetchPosts();
  };

  if (isLoading) {
    return <div> Loading...</div>;
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div> No posts available!</div>;
  }
  return (
    <div className="container-main ml-3">
      <div className="text-center">
        <h3> Total post: {posts.length} </h3>
      </div>
      <div className="container-card row justify-content-between">
       
          {posts.map((post) => {
            return (
              <div key={post._id} className="card g-2">
               
                  <h5> {post.title} </h5>
                  <h6> {post.author.name} </h6>
                  <img src={post.cover} alt="img" />
                  <p>Categoria: {post.category} </p>
                  <a href={post.content}>Vai alla pagina dell'articolo</a>
                  <p> Tempo di lettura: {post.readTime} min </p>
                   <button onClick={() => handlePostClick(post._id)}>
                    {selectedPost === post._id ? "Close window update" : "Update Cover"}
                  </button> 
                   {selectedPost === post._id && (
                    <div className="container-form-update">
                    <UpdateCoverForm
                      postId={post._id}
                      onUpdateCover={handleCoverUpdate}
                    /></div>
                  )} 

                  {/* <Link to={`/updateCover/${post._id}`}>
                  Update Cover
                  </Link> */}
                
              </div>
            );
          })}
        
      </div>
    </div>
  );
};

export default Main;

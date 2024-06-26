import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./main.css";
import UpdateCoverForm from "../Form/FormUpdateCover";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import CommentArea from "../Comments/CommentArea";
import { deletePost } from "../Posts/deletePost";
import { Link } from "react-router-dom";

const Main = ({ postId }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostComment, setSelectedPostComment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  // ! Using the function by type.
  const handlePostClick = (postId, type) => {
    if (type === "cover") {
      setSelectedPost((prevSelectedPost) =>
        prevSelectedPost === postId ? null : postId
      );
    } else if (type === "comment") {
      setSelectedPostComment((prevSelectedPostComment) =>
        prevSelectedPostComment === postId ? null : postId
      );
    }
  };

  // ! GET request for posts.
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/getPosts?page=${currentPage}&pageSize=${pageSize}`
      );
      if (response.status === 404) {
        console.error("Page not Found", response.data);
        return;
      }
      if (response.status === 401) {
        console.error("No authorization", response.data);
        return;
      }
      if (response.status === 500) {
        console.error("Internal Server Error", response.data);
      }
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error get posts", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, pageSize]);

  const handleCoverUpdate = async () => {
    await fetchPosts();
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
    await fetchPosts();
  };

  if (isLoading) {
    return <div> Loading...</div>;
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div> No posts available!</div>;
  }
  return (
    <>
      <div className="container-main ml-3">
        <div className="text-center mt-4">
          <h3> Post on page: {posts.length} </h3>
        </div>
        <div className="mt-4 mb-4">
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
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
                <button onClick={() => handleDelete(post._id)}>
                  Delete post
                </button>
                <Link to={`/updatePost/${post._id}`}>
                  <button> Modifica post</button>
                </Link>
                <button
                  onClick={() => {
                    handlePostClick(post._id, "cover");
                  }}
                >
                  {selectedPost === post._id
                    ? "Close window update"
                    : "Update Cover"}
                </button>
                {selectedPost === post._id && (
                  <div className="container-form-update">
                    <UpdateCoverForm
                      postId={post._id}
                      onUpdateCover={handleCoverUpdate}
                    />
                  </div>
                )}
                <button onClick={() => handlePostClick(post._id, "comment")}>
                  {selectedPostComment === post._id
                    ? "Close comments area"
                    : "Open comments area"}
                </button>
                {selectedPostComment === post._id && (
                  <div className="container-comments">
                    <CommentArea postId={post._id} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Main;

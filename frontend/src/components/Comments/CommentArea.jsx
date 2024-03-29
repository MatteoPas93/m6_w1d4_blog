import React, { useEffect, useState } from "react";
import axios from "axios";
import ResponsivePagination from 'react-responsive-pagination';
import "react-responsive-pagination/themes/classic.css";

const CommentArea = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${postId}/comments`
      );
      setComments(response.data.comments);
      console.log(response.data);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId, currentPage, pageSize]);

  if (isLoading) {
    return <div> Loading...</div>;
  }
  if (!Array.isArray(comments) || comments.length === 0) {
    return <div>No comments available for this post"</div>;
  }

  return (
    <div className="section-comments">
      <h3>Comments:</h3>
      {comments &&
        comments.map((comment, index) => (
          <div key={index}>
            <h5> {comment.user} </h5>
            <p> {comment.comment} </p>
            <p> {comment.date} </p>
          </div>
        ))}
        <div className="mt-4">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CommentArea;

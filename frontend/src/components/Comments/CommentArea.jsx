import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./comments.css";
import AddCommentForm from "../Form/FormAddComment";

const CommentArea = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddComment, setShowAddComment] = useState(false);

  // ! GET request to get comments related to a specific post.
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${postId}/comments`
      );
      if (response.status === 404) {
        console.error("Comments not Found", response.data);
        return;
      }
      if (response.status === 401) {
        console.error("No authorization", response.data);
        return;
      }
      if (response.status === 500) {
        console.error("Internal Server Error", response.data);
      }
      setComments(response.data.comments);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // ! Management of opening and closing of the div containing the comments.

  const handleOpenAddComment = () => {
    setShowAddComment(true);
  };

  const handleCloseAddComment = () => {
    setShowAddComment(false);
  };

  if (isLoading) {
    return <div> Loading...</div>;
  }

  // ! If comments does not exist or has a length equal to zero, only a message is shown, otherwise it returns the comments with the possibility of adding others.
  if (!Array.isArray(comments) || comments.length === 0) {
    return (
      <div>
        <div>No comments available for this post</div>
        <div>
          <button onClick={handleOpenAddComment}>Add comment</button>
        </div>
        {showAddComment && (
          <AddCommentForm postId={postId} onClose={handleCloseAddComment} />
        )}
      </div>
    );
  }

  return (
    <>
      <h3>Comments:</h3>
      <div className="section-comments">
        {comments &&
          comments.map((comment, index) => (
            <div key={index}>
              <h5> {comment.user} </h5>
              <p> {comment.comment} </p>
              <p> {comment.date} </p>
            </div>
          ))}
      </div>
      <div>
        <button onClick={handleOpenAddComment}>Add comment</button>
      </div>
      {showAddComment && (
        <AddCommentForm postId={postId} onClose={handleCloseAddComment} />
      )}
    </>
  );
};

export default CommentArea;

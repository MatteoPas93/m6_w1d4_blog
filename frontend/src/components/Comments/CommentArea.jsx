import React, { useEffect, useState } from "react";
import axios from "axios";
// import ResponsivePagination from "react-responsive-pagination";
// import "react-responsive-pagination/themes/classic.css";
// import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./comments.css";
import AddCommentForm from "../Form/FormAddComment";

const CommentArea = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddComment, setShowAddComment] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(3);
  // const [totalPages, setTotalPages] = useState(0);
  // const [showModal, setShowModal] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${postId}/comments`
      );
      setComments(response.data.comments);
      console.log(response.data);
      // setTotalPages(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);
  // , currentPage, pageSize

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  const handleOpenAddComment = () => {
    setShowAddComment(true);
  }

  const handleCloseAddComment = () => {
    setShowAddComment(false);
  }

  if (isLoading) {
    return <div> Loading...</div>;
  }
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
    // <div
    //   className="modal show"
    //   style={{ display: "block", position: "initial" }}
    // >

    //     <div className="section-comments">
    //       <Modal show={showModal} onHide={handleCloseModal}>
    //         <Modal.Header>
    //           <Modal.Title>Comments</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body>
    //           {comments &&
    //             comments.map((comment, index) => (
    //               <div key={index}>
    //                 <h5> {comment.user} </h5>
    //                 <p> {comment.comment} </p>
    //                 <p> {comment.date} </p>
    //               </div>
    //             ))}
    //         </Modal.Body>
    //         <Modal.Footer>
    //           <Button variant="secondary" onClick={handleCloseModal}>
    //             Close
    //           </Button>
    //           <Button variant="primary">Add comment</Button>
    //         </Modal.Footer>
    //       </Modal>
    //     </div>
    //     <div className="mt-4">
    //       <ResponsivePagination
    //         current={currentPage}
    //         total={totalPages}
    //         onPageChange={setCurrentPage}
    //       />
    //     </div>
    //   </div>
  
    
    <div className="container-comments">
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
    </div>

  );
};

export default CommentArea;

// import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import UpdateCoverForm from "../Form/FormUpdateCover";
// import ResponsivePagination from "react-responsive-pagination";
// import "react-responsive-pagination/themes/classic.css";

// const PostsArea = () => {
//     const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [selectedPostComment, setSelectedPostComment] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(8);
//   const [totalPages, setTotalPages] = useState(0);

//   const handlePostClick = (postId, type) => {
//     if (type === "cover") {
//       setSelectedPost((prevSelectedPost) =>
//         prevSelectedPost === postId ? null : postId
//       );
//     } else if (type === "comment") {
//       setSelectedPostComment((prevSelectedPostComment) =>
//         prevSelectedPostComment === postId ? null : postId
//       );
//     }
//   };
//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_SERVER_BASE_URL}/getPosts?page=${currentPage}&pageSize=${pageSize}`
//       );
//       setPosts(response.data.posts);
//       setTotalPages(response.data.totalPages);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error get posts", error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [currentPage, pageSize]);

//   const handleCoverUpdate = async () => {
//     await fetchPosts();
//   };

//   if (isLoading) {
//     return <div> Loading...</div>;
//   }

//   if (!Array.isArray(posts) || posts.length === 0) {
//     return <div> No posts available!</div>;
//   }

//   return (
//     <>
//       <div className="container-main ml-3">
//         <div className="text-center">
//           <h3> Total post: {posts.length} </h3>
//         </div>
//         <div className="container-card row justify-content-between">
//           {posts.map((post) => {
//             return (
//               <div key={post._id} className="card g-2">
//                 <h5> {post.title} </h5>
//                 <h6> {post.author.name} </h6>
//                 <img src={post.cover} alt="img" />
//                 <p>Categoria: {post.category} </p>
//                 <a href={post.content}>Vai alla pagina dell'articolo</a>
//                 <p> Tempo di lettura: {post.readTime} min </p>
//                 <button
//                   onClick={() => {
//                     handlePostClick(post._id, "cover");
//                   }}
//                 >
//                   {selectedPost === post._id
//                     ? "Close window update"
//                     : "Update Cover"}
//                 </button>
//                 {selectedPost === post._id && (
//                   <div className="container-form-update">
//                     <UpdateCoverForm
//                       postId={post._id}
//                       onUpdateCover={handleCoverUpdate}
//                     />
//                   </div>
//                 )}
//                 <button onClick={() => handlePostClick(post._id, "comment")}>
//                   {/* {selectedPostComment === post._id
//                     ? "Close comments area"
//                     : "Open comments area"} */}{" "}
//                   Open comments area
//                 </button></div>
//             );
//           })}
//         </div>
//       </div>
//       <div className="mt-4">
//         <ResponsivePagination
//           current={currentPage}
//           total={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </>
//   )
// }

// export default PostsArea
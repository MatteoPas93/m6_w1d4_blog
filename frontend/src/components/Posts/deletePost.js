import axios from "axios";

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_BASE_URL}/deletePost/${postId}`
    );
    if (response.status === 200) {
      return  alert("Post successfully deleted!") 
    }
  } catch (error) {
    console.error(error);
    return alert("Error deleting post!");
  }
};

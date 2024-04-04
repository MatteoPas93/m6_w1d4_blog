import NavigationBar from "../components/Nav/nav";
import UpdatePostForm from "../components/Form/FormUpdatePost";
import { useParams } from "react-router-dom";

const UpdatePostPage = () => {
  const postId = useParams();

  return (
    <>
      <NavigationBar />
      <UpdatePostForm postId={postId} />
    </>
  );
};

export default UpdatePostPage;

import "./App.css";
// import CreatePostForm from './components/Form/Form';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import AddPostPage from "./pages/AddPostPage";
import UpdateCoverPage from "./pages/UpdateCoverPost";
import RegistrationUser from "./pages/CreateUser";
import UpdatePostPage from "./pages/UpdatePost";
import ProtectedRoutes from "./middleware/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationUser />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/success" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/addPost" element={<AddPostPage />} />
          <Route path="/updateCover/:id" element={<UpdateCoverPage />} />
          <Route path="/updatePost/:id" element={<UpdatePostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

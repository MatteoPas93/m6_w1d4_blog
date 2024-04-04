import './App.css';
// import CreatePostForm from './components/Form/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import AddPostPage from './pages/AddPostPage';
import UpdateCoverPage from './pages/UpdateCoverPost';
import RegistrationUser from './pages/CreateUser';
import UpdatePostPage from './pages/UpdatePost';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route exact path='/' element={<LoginPage/>} />
    <Route path='/success' element={<SuccessPage/>} />
   <Route path='/home' element={<HomePage/>} />
   <Route path='/addPost' element={<AddPostPage/>}/>
   <Route path='/updateCover/:id' element={<UpdateCoverPage/>}/>
   <Route path='/registration' element={<RegistrationUser/>} />
   <Route path='/updatePost/:id' element={<UpdatePostPage/>} />
   </Routes>
    </BrowserRouter>
  )
}

export default App;

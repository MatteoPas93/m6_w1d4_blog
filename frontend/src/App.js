import './App.css';
// import CreatePostForm from './components/Form/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import Login from './pages/Login';
import AddPostPage from './pages/addPostPage';
import UpdateCoverPage from './pages/updateCoverPost';

function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route exact path='/' element={<Login/>} />
   <Route path='/home' element={<HomePage/>} />
   <Route path='/addPost' element={<AddPostPage/>}/>
   <Route path='/updateCover/:id' element={<UpdateCoverPage/>}/>
   </Routes>
    </BrowserRouter>
  )
}

export default App;

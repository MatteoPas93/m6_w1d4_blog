import './App.css';
// import CreatePostForm from './components/Form/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage/homepage';
import Login from './pages/Login';

function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route exact path='/' element={<Login/>} />
   <Route exact path='/home' element={<HomePage/>} />
   </Routes>
    </BrowserRouter>
  )
}

export default App;

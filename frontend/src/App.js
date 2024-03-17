import './App.css';
// import NavigationBar from './components/Nav/nav';
import Main from './components/Main/main';
import CreatePostForm from './components/Form/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <>
   <CreatePostForm/>
   {/* <NavigationBar /> */}
   <Main/>
    </>
  )
}

export default App;

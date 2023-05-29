import './App.css';
import { Home } from './pages/home';
import { PostDetail } from './pages/postDetail';
import { UserDetail } from './pages/userDetail';
import { Routes, Route } from 'react-router-dom';

export const baseUrl = "https://dummyjson.com"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/userDetail' element={<UserDetail />} />
        <Route path='/postDetail' element={<PostDetail />} />
      </Routes>
    </>
  );
}

export default App;

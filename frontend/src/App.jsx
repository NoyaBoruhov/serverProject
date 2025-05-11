import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './Pages/login';
import Register from './Pages/register';
import Home from "./Pages/home";
import FullDetails from "./Pages/fullDetails";
import Todos from "./Pages/Todos";
import Albums from "./Pages/Albums";
import Posts from "./Pages/Posts"
import Info from "./Pages/Info";
import './App.css';
import './index.css';
import ErrorPage from "./Pages/ErrorPage";
import ShowPhotos from "./Components/showPhotos";

import { UserProvider } from "./Components/UseContext";
import Comments from "./Components/Comments";

function App() {
  return (

    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/fullDetails" element={<FullDetails />} />
          <Route path="users/:id/home" element={<Home />} >
            <Route path="todos" element={<Todos />} />
            <Route path="albums" element={<Albums />}>
              <Route path=":albumId/photos" element={<ShowPhotos />}/>
            </Route>
            <Route path="info" element={<Info />} />
            <Route path="post" element={<Posts />}>
             <Route path=":postId/comments" element={<Comments />}/>
            </Route>
          </Route>
          {/* עמוד 404 */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>);


}

export default App

import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Register from "./pages/register/Register";
import Search from "./pages/Search/Search";
import Login from "./pages/login/Login";
import NavBar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import Navbar from '../src/components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = (user === undefined);

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

  }, [auth]);

  if (loadingUser) return <p>Carregando...</p>;

  return (
    <div className="App">
      <AuthProvider value={ { user } }>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={ !user ? <Login /> : <Navigate to="/" /> } />
              <Route path='/register' element={ !user ? <Register /> : <Navigate to="/" /> } />
              <Route path='/posts/create' element={ user ? <CreatePost /> : <Navigate to="/login" /> } />
              <Route path='/dashboard' element={ user ? <Dashboard /> : <Navigate to="/login" /> } />
              <Route path='/posts/edit/:id' element={ user ? <EditPost /> : <Navigate to="/login" /> } />
              <Route path='search' element = {  <Search /> }/>
              <Route path='/posts/:id' element = { <Post /> } />
            </Routes >
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

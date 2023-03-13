import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import NavBar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import Navbar from '../src/components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';


function App() {

  const [user, setUser] = useState(undefined);
  
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })

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
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes >
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

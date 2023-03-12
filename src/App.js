import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home";

import About from "./pages/about/About";

import Register from "./pages/register/Register";

import Login from "./pages/login/Login";

import NavBar from "../src/components/Navbar";

import Footer from "../src/components/Footer";
import Navbar from '../src/components/Navbar';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element = { <Home /> } />
            <Route path='/about' element = { <About /> } />
            <Route path='/login' element = { <Login /> } />
            <Route path='/register' element = { <Register /> } />
          </Routes >
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

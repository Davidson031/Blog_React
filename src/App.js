import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home";

import About from "./pages/about/About";

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
          </Routes >
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

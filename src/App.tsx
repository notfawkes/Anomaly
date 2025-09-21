import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MatrixBackground from './components/MatrixBackground';

import Home from './pages/Home';
import Game from './pages/Game';
import About from './pages/About';
import Login from './pages/Login';

export function App() {
  return (
    <>
      <MatrixBackground />

      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}
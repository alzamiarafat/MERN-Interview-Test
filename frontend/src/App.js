import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DrawingPage from "./pages/DrawingPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drawing/:id" element={<DrawingPage />} />
        <Route path="/drawing-create" element={<DrawingPage />} />
      </Routes>
    </Router>
  );
}

export default App;

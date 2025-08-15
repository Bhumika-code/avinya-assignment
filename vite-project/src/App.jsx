import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Domestic from "./pages/Domestic";
import International from "./pages/International";

function App() {
  return (
    <Router>
      <Header />
  
      <Routes>
        <Route path="/" element={<Navigate to="/domestic" />} />
        <Route path="/domestic" element={<Domestic />} />
        <Route path="/international" element={<International />} />
      </Routes>
    </Router>
  );
}

export default App;

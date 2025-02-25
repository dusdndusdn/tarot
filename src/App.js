import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import CardSelectionPage from "./components/select/CardSelectionPage";
import ResultPage from "./components/result/ResultPage";

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select" element={<CardSelectionPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
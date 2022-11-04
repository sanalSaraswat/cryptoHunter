import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CoinPage from "./Pages/CoinPage";
import HomePage from "./Pages/HomePage";
import "./css/App.css"


export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins/:id" element={<CoinPage />} />

      </Routes>
    </div>

  );
}



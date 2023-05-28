import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cardedit from "./components/CardEdit";
import Finalcard from "./components/FinalCard";
import Card from "./components/Card";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/card" element={<Card />} />
        <Route path="/cardedit" element={<Cardedit />} />
        <Route path="/finalcard/:name" element={<Finalcard />} />
      </Routes>
    </Router>
  </>
);

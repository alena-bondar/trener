import React from "react";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import "./styles/main.scss";
import Content from "./components/content/Content";
import TrenersInfo from "./components/trener's info/TrenersInfo";
import { Routes, Route } from "react-router";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/filters" element={<Content />} />
        <Route path="/:id" element={<TrenersInfo />}/>
      </Routes>

      <Footer />
    </div>
  );
};

export default App;

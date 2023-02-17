import "./App.css";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import CardView from "./components/CardView";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Router basename="/">
        <Navbar />
        <Routes>
          <Route path="/" index element={<CardView />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;

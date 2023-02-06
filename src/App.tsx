import './App.css'

import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar  from './components/Navbar'
import React from 'react'


const App = () => {
  return (
    <>
    <Router basename="/">
      <Navbar />
      <Routes>
        {/* <Route path="/" index element={<Home />} /> */}
        
      </Routes>
    </Router>
    </>
  )
}

export default App
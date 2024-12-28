import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dash';
import './Styles/App.css';
import Nav from './Components/Nav';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import Scheduler from './Components/Scheduler';
import Creator from './Components/Creators.js';
import Brand from './Components/Brand.js';
import Brandauth from './Components/Brandauth';
import BrandNav from './Components/BrandNav';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Brand" element={<><BrandNav /><Brand /></>} />
          <Route path="/dashboard" element={<><Nav /><Dashboard /></>} />
          <Route path="/Post Scheduling" element={<><Nav /><Scheduler/></>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/analytics" element={<><Nav /><div>Analytics Page</div></>} />
          <Route path="/creators/*" element={<><Nav /><Creator/></>} />
          <Route path="/settings" element={<><Nav /><div>Settings Page</div></>} />
          <Route path="/profile" element={<><Nav /><Profile /></>} />
          <Route path="/brandauth" element={<Brandauth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
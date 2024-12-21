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
function App() {
  return (
    <Router>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Post Scheduling" element={<Scheduler/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/analytics" element={<div>Analytics Page</div>} />
          <Route path="/reports" element={<div>Reports Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>

    

  );
}

export default App;
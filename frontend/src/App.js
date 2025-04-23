// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CreerTicket from './pages/CreerTicket';
import Register from './pages/Register';
import Home from './pages/Home';
import ListeTickets from './pages/ListeTickets';
import AdminUsers from './pages/AdminUsers';
import AdminDashboard from './pages/AdminDashboard';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/creer-ticket" element={<CreerTicket />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tickets" element={<ListeTickets />} />
        <Route path="/liste-tickets" element={<ListeTickets />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

// src/pages/Home.js
import React from 'react';
import Navbar from './components/Navbar';
import '../App.css';

function Home() {
  const role = localStorage.getItem('role') || 'Employé';
  const email = localStorage.getItem('email') || 'inconnu';

  return (
    <>
      <Navbar />
      <div className="container home-card">
        <h2>Bienvenue <span className="highlight">{email}</span> !</h2>
        <p>Vous êtes connecté en tant que : <strong className="role-tag">{role}</strong></p>
      </div>
    </>
  );
}

export default Home;

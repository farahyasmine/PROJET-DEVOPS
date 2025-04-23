// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const user = JSON.parse(localStorage.getItem("user"));
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // on supprime token, email, rôle
    navigate('/');
  };

  return (
    
    <nav style={styles.nav}>
      <Link to="/home" style={styles.link}>Accueil</Link>
      <Link to="/creer-ticket" style={styles.link}>Créer un ticket</Link>
      <Link to="/tickets" style={styles.link}>Mes tickets</Link>
      <button onClick={handleLogout} style={styles.button}>Se déconnecter</button>
      {user?.role === "Admin" && (
      <li className="nav-item">
        <Link to="/admin-users" className="nav-link">Utilisateurs</Link>
      </li>
    )}
        
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#b76cf4',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'white',
    color: '#b76cf4',
    border: 'none',
    padding: '6px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: 'bold',
  }
};

export default Navbar;

// src/pages/Login.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Link } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', {
        email,
        mot_de_passe: motDePasse
      });

      const { token, user: utilisateur } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate('/home');
    } catch (error) {
      alert('Échec de la connexion. Vérifie tes identifiants.');
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Connexion</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        <p style={{ marginTop: '1rem' }}>
  Pas encore de compte ? <Link to="/register" style={{ color: '#b76cf4', fontWeight: 'bold' }}>Créer un compte</Link>
</p>

      </form>
    </div>
  );
}

export default Login;

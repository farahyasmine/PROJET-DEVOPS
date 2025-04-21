import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [role, setRole] = useState('Employe');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', {
        email,
        mot_de_passe: motDePasse,
        role,
      });
      alert("Inscription réussie !");
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="form-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
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

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Employe">Employé</option>
          <option value="Technicien">Technicien</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit">S’inscrire</button>
      </form>
    </div>
  );
}

export default Register;

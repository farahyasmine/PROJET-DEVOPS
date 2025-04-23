import React, { useState } from 'react';
import api from '../api';
import Navbar from './components/Navbar';
import '../App.css'; // Pour les styles globaux

function CreerTicket() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');

  const envoyerTicket = async () => {
    console.log("Tentative d'envoi du ticket...");

    try {
      const res = await api.post(
        '/tickets',      
        {
          titre,
          description,
          priorite: 'Moyenne',
          id_employe: 1
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      alert('Ticket envoyé avec succès !');
      console.log(res.data);
    } catch (err) {
      console.error('Erreur lors de l’envoi du ticket :', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Créer un ticket</h2>
        <form className="form-ticket" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Titre du ticket"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="input-style"
          />
          <textarea
            placeholder="Description du ticket"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea-style"
          />
          <button className="btn-style" onClick={envoyerTicket}>
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
}

export default CreerTicket;

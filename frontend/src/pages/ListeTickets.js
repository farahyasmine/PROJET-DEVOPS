// src/pages/ListeTickets.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from './components/Navbar';
import '../App.css';

function ListeTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.post(
          '/tickets',
         {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTickets(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des tickets :", err);
      }
    };

    fetchTickets();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Liste des tickets</h2>
        {tickets.length === 0 ? (
          <p className="no-ticket">Aucun ticket pour le moment.</p>
        ) : (
          <div className="ticket-list">
            {tickets.map(ticket => (
              <div className="ticket-card" key={ticket.id}>
                <h3>{ticket.titre}</h3>
                <p>{ticket.description}</p>
                <div className="ticket-meta">
                  <span><strong>Statut :</strong> {ticket.statut}</span>
                  <span><strong>Priorité :</strong> {ticket.priorite}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ListeTickets;

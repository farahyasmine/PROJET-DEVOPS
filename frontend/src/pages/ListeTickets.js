import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from './components/Navbar';
import '../App.css';

function ListeTickets() {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  const [ticketAModifier, setTicketAModifier] = useState(null);
  const [statut, setStatut] = useState("");
  const [priorite, setPriorite] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get('/tickets', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTickets(res.data);

        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          console.log("Utilisateur connecté :", parsedUser);
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des tickets :", err);
      }
    };

    fetchTickets();
  }, []);

  const fermerTicket = async (id) => {
    try {
      await api.put(`/tickets/${id}/fermer`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert("Ticket fermé !");
      window.location.reload();
    } catch (err) {
      alert("Erreur lors de la fermeture du ticket.");
      console.error(err);
    }
  };

  const modifierTicket = async (id) => {
    try {
      await api.put(`/tickets/${id}`, {
        statut,
        priorite
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert("Ticket mis à jour !");
      setTicketAModifier(null);
      window.location.reload();
    } catch (err) {
      alert("Erreur lors de la mise à jour.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      {!user ? (
        <p style={{ padding: "10px" }}>Chargement de l'utilisateur...</p>
      ) : (
        <div className="container">
          <p style={{ background: "#eee", padding: "10px" }}>
            ✅ Connecté : {user.nom} ({user.role})
          </p>

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

                  {user && user.role === "Technicien" && (
                    <div style={{ marginTop: "10px" }}>
                      <button onClick={() => fermerTicket(ticket.id)} className="btn-action">Fermer</button>
                      <button onClick={() => {
                        setTicketAModifier(ticket);
                        setStatut(ticket.statut);
                        setPriorite(ticket.priorite);
                      }} className="btn-action" style={{ marginLeft: "10px" }}>Modifier</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {ticketAModifier && (
            <div className="modification-form">
              <h4>Modifier le ticket #{ticketAModifier.id}</h4>

              <label>Statut :</label>
              <select value={statut} onChange={e => setStatut(e.target.value)}>
                <option value="Ouvert">Ouvert</option>
                <option value="En cours">En cours</option>
                <option value="Résolu">Résolu</option>
                <option value="Fermé">Fermé</option>
              </select>

              <br /><br />

              <label>Priorité :</label>
              <select value={priorite} onChange={e => setPriorite(e.target.value)}>
                <option value="Faible">Faible</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Élevée">Élevée</option>
                <option value="Critique">Critique</option>
              </select>

              <br /><br />

              <button onClick={() => modifierTicket(ticketAModifier.id)} className="btn-save">Enregistrer</button>
              <button onClick={() => setTicketAModifier(null)} className="btn-cancel" style={{ marginLeft: "10px" }}>Annuler</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ListeTickets;

import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from './components/Navbar';
import '../App.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));

      try {
        const res = await api.get('/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Erreur chargement stats :", err);
      }
    };

    fetchStats();
  }, []);

  if (!user || user.role !== "Admin") {
    return <p style={{ padding: "10px" }}>Accès refusé. Réservé aux administrateurs.</p>;
  }

  if (!stats) return <p style={{ padding: "10px" }}>Chargement des statistiques...</p>;

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Tableau de bord Admin</h2>

        <div className="stats-cards">
          <div className="card">📋 <strong>Total tickets :</strong> {stats.totalTickets}</div>
          <div className="card">🟡 <strong>Ouverts :</strong> {stats.ticketsOuverts}</div>
          <div className="card">✅ <strong>Résolus :</strong> {stats.ticketsResolus}</div>
        </div>

        <h3 style={{ marginTop: '30px' }}>⏱️ Temps moyen de résolution par technicien (en minutes)</h3>
        <ul>
          {stats.tempsParTech.map(t => (
            <li key={t.nom}>
              <strong>{t.nom}</strong> : {t.moyenne_resolution_min !== null ? `${t.moyenne_resolution_min} min` : "Aucune résolution encore"}
            </li>
          ))}
        </ul>

        <h3 style={{ marginTop: '30px' }}>🚨 Tickets Critiques</h3>
        <ul>
          {stats.ticketsCritiques.map(t => (
            <li key={t.id}>
              <strong>{t.titre}</strong> - {t.description} ({new Date(t.date_creation).toLocaleDateString()})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminDashboard;
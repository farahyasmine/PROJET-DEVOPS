// src/pages/AdminUsers.js
import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "./components/Navbar";
import "../App.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null); // Admin connecté

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const currentUser = JSON.parse(localStorage.getItem("user"));
        setUser(currentUser);

        const res = await api.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs :", err);
      }
    };

    fetchData();
  }, []);

  const changerRole = async (id, nouveauRole) => {
    try {
      await api.put(`/admin/users/${id}/role`, { role: nouveauRole }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("Rôle mis à jour !");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du rôle.");
    }
  };

  const supprimerUtilisateur = async (id) => {
    if (window.confirm("Confirmer la suppression de cet utilisateur ?")) {
      try {
        await api.delete(`/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        alert("Utilisateur supprimé.");
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  if (!user || user.role !== "Admin") {
    return <p>Accès refusé. Réservé aux administrateurs.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Gestion des utilisateurs</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Date d’inscription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.nom}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) => changerRole(u.id, e.target.value)}
                  >
                    <option value="Employe">Employé</option>
                    <option value="Technicien">Technicien</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td>{new Date(u.date_inscription).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => supprimerUtilisateur(u.id)} className="btn-danger">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminUsers;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBox, FaUsers, FaShoppingCart } from "react-icons/fa";

const AnimatedCounter = ({ Number }) => {
  const [Count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    if (Number === 0) return;

    const duree = 1500;
    const interval = Math.floor(duree / Number);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === Number) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [Number]);

  return <p className="card-text">{Count}</p>;
};

const Dashboard = () => {

  
  const [stats, setStats] = useState({ produits: 0, utilisateurs: 0, commandes: 0 });
  const [latestCommandes, setLatestCommandes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:8000/api/commandes')
      .then(res => setLatestCommandes(res.data.slice(0, 5)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 w-100">
      <h2 className="mb-4">Bienvenue, Admin</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card bg-white mb-3">
            <div className="card-body d-flex align-items-center">
              <FaBox size={32} color="#ff5e91" className="me-3" />
              <div>
                <h5 className="card-title">Produits</h5>
                <AnimatedCounter Number={stats.produits} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-white mb-3">
            <div className="card-body d-flex align-items-center">
              <FaUsers size={32} color="#5eafff" className="me-3" />
              <div>
                <h5 className="card-title">Utilisateurs</h5>
                <AnimatedCounter Number={stats.utilisateurs} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-white mb-3">
            <div className="card-body d-flex align-items-center">
              <FaShoppingCart size={32} color="#ffb15e" className="me-3" />
              <div>
                <h5 className="card-title">Commandes</h5>
                <AnimatedCounter Number={stats.commandes} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 className="mt-5 mb-3">Dernières Commandes</h4>
      <ul className="list-group">
        {latestCommandes.map(cmd => (
          <li key={cmd.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>#{cmd.id} - {cmd.utilisateur?.nom || "Utilisateur"} ({cmd.statut})</span>
            <span>{cmd.montant_total} DH</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

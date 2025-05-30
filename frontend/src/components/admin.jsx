import React, { useState } from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import Produits from './Produits';

function Admin() {
  const [Page, setPage] = useState('dashboard');

  const Contenu = () => {
    switch (Page) {
      case 'dashboard':
        return <Dashboard />;
      case 'Acceuil':
        return <div>Bienvenue à la page d'accueil</div>;
      case 'produits':
        return <Produits />;
      case 'utilisateurs':
        return <div>Page Utilisateurs</div>;
      case 'commandes':
        return <div>Page Commandes</div>;
      case 'profile':
        return <div>Page Profile</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex' ,}}>
      <Sidebar setPage={setPage} />
      <div style={{ marginLeft: '250px', width: '100%', padding: '20px' }}>
        {Contenu()}
      </div>
    </div>
  );
}

export default Admin;

import React from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';

function Admin() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', width: '100%', padding: '20px' }}>
        <Dashboard />
      </div>
      <div></div>
    </div>
  );

}

export default Admin;

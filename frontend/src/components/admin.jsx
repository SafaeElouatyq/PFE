import React from 'react';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';

function Admin() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', width: '100%', padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;

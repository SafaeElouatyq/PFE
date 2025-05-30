// import Admin from './components/admin';
// import Dashboard from './components/dashboard';
// import Sidebar from './components/sidebar';

// function App() {
//   return (
//     <div className="App">
//       <Admin/>
//     </div>
//   );
// }

// export default App;
import React from "react";
import LoginForm from "./pages/auth/LoginForm"; // dima hya li tban luwla
//import Dashboard from "./components/dashboard";
import RegisterForm from "./pages/auth/RegisterForm";
import Admin from './components/admin';
 //import Sidebar from './components/sidebar';
import { Routes, Route } from 'react-router-dom';
export default function App() {
  return (
  
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/admin" element={<Admin />} />

       
      </Routes>
    
  );
}

import React from 'react';
import AdminDashboard from './components/AdminDashboard';
import './App.css';


function App() {
  return (
    <div className='App'>
      <h1>Admin Dashboard</h1>
     <div className='container'>
       <div className='row'>
          <div className='col-md-12'>
            <AdminDashboard />
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default App;

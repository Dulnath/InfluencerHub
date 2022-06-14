import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddProject from './Components/AddProject';
import AllProjects from './Components/AllProjects';
import AddEvents from './Components/AddEvents';
import AllEvents from './Components/AllEvents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddProject />} />    
        <Route path="/allProjects" element={<AllProjects />} />
        <Route path="/addEvents/:projectName/:projectID" element={<AddEvents />} />
        <Route path="/allEvents/:projectName/:projectID" element={<AllEvents />} />
      </Routes>
    </Router>
  );
}

export default App;

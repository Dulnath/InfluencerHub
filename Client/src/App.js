import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddProject from './Components/AddProject';
import AllProjects from './Components/AllProjects';
import AddEvents from './Components/AddEvents';
import AllEvents from './Components/AllEvents';
import EditProject from './Components/EditProject';
import ProjectDetails from './Components/ProjectDetails';
import EventCard from './Components/EventCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AddProject />} />
        <Route path="/allProjects" element={<AllProjects />} />
        <Route path="/addEvents" element={<AddEvents />} />
        <Route path="/allEvents" element={<AllEvents />} />
        <Route path="/editProject/:id" element={<EditProject />} />
        <Route Path="/project/:id" element={<ProjectDetails />} />
        <Route Path="/event/:id" element={<EventCard />} />
      </Routes>
    </Router>
  );
}

export default App;

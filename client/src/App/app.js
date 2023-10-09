import React from "react"
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Authentication from './Authentication/index'
import Dashboard from './Dashboard/vehicleRegister/index'
import ViewPage from './Dashboard/viewVehicle/index'

// Features
const Features = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </Router>
  );
}
// Export
export default Features
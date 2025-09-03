import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IncidentReport } from "./IncidentReport";
import { IncidentsList } from "./IncidentsList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IncidentReport />} />
        <Route path="/admin/incidentsList" element={<IncidentsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

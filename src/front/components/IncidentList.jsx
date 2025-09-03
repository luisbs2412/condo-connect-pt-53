import React, { useEffect, useState } from "react";

  const IncidentsList = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/incidents")
      .then(res => res.json())
      .then(data => setIncidents(data))
      .catch(err => console.error("Error al cargar incidentes:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Lista de Incidentes</h2>
      {incidents.length === 0 ? (
        <p>No hay reportes todavía.</p>
      ) : (
        <ul>
          {incidents.map((i, idx) => (
            <li key={idx}>
              <strong>{i.title}</strong> - {i.description} ({i.apartment})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default IncidentsList
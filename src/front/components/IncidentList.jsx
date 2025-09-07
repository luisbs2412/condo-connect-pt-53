import React, { useEffect, useState } from "react";

const IncidentList = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch(`${backendUrl}api/incidents`);
        if (!res.ok) throw new Error("Error al obtener incidencias");
        const data = await res.json();
        setIncidents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [backendUrl]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta incidencia?")) return;

    try {
      const res = await fetch(`${backendUrl}api/incidents/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar incidencia");
      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar la incidencia");
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setIncidents(
      incidents.map((incident) =>
        incident.id === id ? { ...incident, status: newStatus } : incident
      )
    );
  };

  if (loading) return <p className="text-center mt-4">Cargando incidencias...</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Incident List</h3>
      {incidents.length === 0 ? (
        <p>No hay incidencias reportadas.</p>
      ) : (
        <ul className="list-group">
          {incidents.map((incident) => (
            <li key={incident.id} className="list-group-item d-flex flex-column">
              <div>
                <p><strong>Name:</strong> {incident.name}</p>
                <p><strong>Email:</strong> {incident.email}</p>
                {incident.apartment && <p><strong>Apartment:</strong> {incident.apartment}</p>}
                <p><strong>Title:</strong> {incident.title}</p>
                <p><strong>Description:</strong> {incident.description}</p>
              </div>

              {/* Selector de status */}
              <div className="mt-2">
                <label className="form-label"><strong>Status</strong></label>
                <select
                  className="form-select form-select-sm mb-2"
                  value={incident.status || "New"}
                  onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                >
                  <option value="New">New</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              {/* Botón eliminar */}
              <div className="d-flex justify-content-end mt-2">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(incident.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncidentList;

import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const TenantIncidentsList = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { store } = useGlobalReducer();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const userEmail = store?.user.user?.email;

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch(`${backendUrl}api/incidents/${userEmail}`);
        if (!res.ok) throw new Error("Error al obtener incidencias");
        const data = await res.json();
        setIncidents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) return <p>Loading incidents...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
  <h4 className="mb-3">
    In this section, you will find a record of all the incidents you have reported in the condominium.
  </h4>

  <p className="fs-6">
    Here you can view the title, description, and current status of each report, allowing you to track their resolution progress.
  </p>

  <h5 className="mt-3">Please note that statuses may include:</h5>

  <p className="fs-6">
    <strong>In Progress:</strong> the management team is currently working on the solution.
  </p>

  <p className="fs-6">
    <strong>Resolved:</strong> the incident has already been addressed and resolved.
  </p>

  <p className="fs-6 mt-3">
    This way, you will always stay informed about the status of your reports.
  </p>

      {incidents.length === 0 ? (
        <p>You have no reported incidents.</p>
      ) : (
        <ul className="list-group">
          {incidents.map((incident) => (
            <li
              key={incident.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{incident.title}</h5>
                <p className="mb-1">{incident.description}</p>
              </div>
              <span
                className={`badge ${incident.status === "new"
                    ? "bg-primary" 
                    : incident.status === "In Progress"
                      ? "bg-warning text-dark"
                      : "bg-success"
                  }`}
              >
                {incident.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TenantIncidentsList;

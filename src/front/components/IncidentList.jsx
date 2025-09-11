import React, { useState, useEffect } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const IncidentList = () => {
    const { store } = useGlobalReducer();
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [incidents, setIncidents] = useState([]); // Cambiado para almacenar la lista de incidentes
    
    useEffect(() => {
        fetchIncidents();
    }, []); 

    const fetchIncidents = () => {
        fetch(`${backendUrl}api/incidents/all`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener las incidencias');
                }
                return response.json();
            })
            .then((data) => {
                setIncidents(data); 
            })
            .catch((error) => {
                console.error('Error de red:', error);
            });
    };

    const handleStateChange = (id, newState) => {
        fetch(`${backendUrl}api/incidents/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newState }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el estado');
                }
                return response.json();
            })
            .then(() => {
                setIncidents(incidents.map(incident =>
                    incident.id === id ? { ...incident, status: newState } : incident
                ));
                fetchIncidents(); 
            })
            .catch((error) => {
                console.error('Error de red:', error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center p-3 p-md-4">
            <div className="card shadow-lg rounded-4 p-3 p-md-4 w-100" style={{ maxWidth: "auto" }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">List of incidents</h2>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Tenant</th>
                                    <th>Apartment</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {incidents.map((incident) => (
                                    <tr key={incident.id}>
                                        <td>{incident.title}</td>
                                        <td>{incident.description}</td>
                                        <td>{incident.name}</td>
                                        <td>{incident.apartment}</td>
                                        <td>
                                            <span className={`badge ${incident.status === 'new' ? 'bg-primary' :
                                                incident.status === 'InProgress' ? 'bg-warning text-dark' :
                                                    'bg-success'
                                                }`}>
                                                {incident.status?.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                className="form-select"
                                                value={incident.status}
                                                onChange={(e) => handleStateChange(incident.id, e.target.value)}>
                                                <option value="">Seleccionar</option>
                                                <option value="InProgress">InProgress</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncidentList;
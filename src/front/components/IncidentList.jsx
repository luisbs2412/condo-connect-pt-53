import React from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";

const IncidentList = () => {
  const { store } = useGlobalReducer();
  const [state, setState] = useState({
    titulo: '',
    descripcion: '',
    inquilino: '',
    apartamento: '',
    estado: ''
  });

  const incidentes = [
    {
      id: 1,
      titulo: 'Tubería de lavamanos tapada',
      descripcion: 'No drena el agua desde ayer',
      inquilino: 'María Pérez',
      apartamento: 152,
      estado: 'in_progress',
    },
    {
      id: 2,
      titulo: 'Fregadero gotea',
      descripcion: 'Goteo constante',
      inquilino: 'Carlos Ruiz',
      apartamento: 212,
      estado: 'new',
    },
    {
      id: 3,
      titulo: 'La basura no la están recogiendo',
      descripcion: 'Acumulación de basura en el pasillo',
      inquilino: 'Ana Gómez',
      apartamento: 101,
      estado: 'new',
    },
    {
      id: 4,
      titulo: 'El techo gotea',
      descripcion: 'Filtración de agua cuando llueve',
      inquilino: 'Luis Torres',
      apartamento: 305,
      estado: 'in_progress',
    },
    {
      id: 5,
      titulo: 'El pasillo está sucio',
      descripcion: 'No han limpiado desde hace una semana',
      inquilino: 'Sofía Martínez',
      apartamento: 178,
      estado: 'resolved',
    },
    {
      id: 6,
      titulo: 'Puerta principal dañada',
      descripcion: 'No cierra bien, riesgo de seguridad',
      inquilino: 'Pedro Sánchez',
      apartamento: 220,
      estado: 'new',
    },
    {
      id: 7,
      titulo: 'Problemas con el ascensor',
      descripcion: 'Se detiene entre pisos',
      inquilino: 'Lucía Fernández',
      apartamento: 410,
      estado: 'in_progress',
    },
  ];

  const handleStateChange = (id, newState) => {
    fetch(`${backendUrl}api/incidents/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado: newState }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar el estado');
        }
        return response.json();
      })
      .then(() => {
        setState(incidentes.map(incidente =>
          incidente.id === id ? { ...incidente, estado: newState } : incidente
        ));
      })
      .catch((error) => {
        console.error('Error de red:', error);
      });
  }

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light p-3">
      <div className="card shadow-lg rounded-4 p-3 p-md-4 w-100" style={{ maxWidth: "auto" }}>
        <div className="card-body">
            <h2 className="card-title text-center mb-4">Incident Management</h2>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Inquilino</th>
                  <th>Apartamento</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* Incidentes existentes */}
                {incidentes.map((incidente) => (
                  <tr key={incidente.id}>
                    <td>{incidente.titulo}</td>
                    <td>{incidente.descripcion}</td>
                    <td>{incidente.inquilino}</td>
                    <td>{incidente.apartamento}</td>
                    <td>
                      <span className={`badge ${incidente.estado === 'new' ? 'bg-primary' :
                        incidente.estado === 'in_progress' ? 'bg-warning text-dark' :
                          'bg-success'
                        }`}>
                        {incidente.estado.replace('_', ' ')}
                      </span>
                    </td>
                    <td>

                      <select
                        className="form-select"
                        value={incidente.estado}
                        onChange={(e) => handleStateChange(incidente.id, e.target.value)}>
                        <option value="">Seleccionar</option>
                      <option value="in_progress">En progreso</option>
                      <option value="resolved">Resuelto</option>
                    </select>
                  </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div >
  );
};

export default IncidentList;
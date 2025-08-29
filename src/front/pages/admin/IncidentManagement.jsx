import React from 'react'
import IncidentList from '../../components/IncidentList.jsx';

export const IncidentManagement = () => {
    return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light p-3">
      <div className="card shadow-lg rounded-4 p-3 p-md-4 w-100" style={{ maxWidth: "800px" }}>
        <div className="card-body">
          <h2 className="h4 fw-semibold text-secondary mb-3 text-center">Manage Incidents</h2>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Inquilino</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* 5 filas vacías */}
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Título del incidente"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre del inquilino"
                      />
                    </td>
                    <td>
                      <span className="badge bg-secondary">In Progress</span>
                    </td>
                    <td>
                      <select className="form-select">
                        <option>Seleccionar</option>
                        <option>In progress</option>
                        <option>Resolved</option>
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
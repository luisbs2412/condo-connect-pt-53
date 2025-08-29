import React from 'react'
import TenantRegisterForm from '../../components/TenantRegisterForm.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
 

export const RegisterTenantPage = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light py-4">
      {/* Título */}
      <h1 className="display-5 fw-bold mb-4 text-dark text-center">
        Admin Portal
      </h1>

      {/* Tarjeta */}
      <div className="card shadow-lg rounded-4 p-3 p-md-4 w-100" style={{ maxWidth: "500px" }}>
        <div className="card-body text-center">
          <h2 className="h4 fw-semibold text-secondary mb-4">
            Datos del Inquilino
          </h2>

          {/* Inputs */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre y Apellido"
              className="form-control form-control-lg mb-3"
            />
            <input
              type="text"
              placeholder="Número de APT"
              className="form-control form-control-lg mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              className="form-control form-control-lg"
            />
          </div>

          {/* Botones */}
          <div className="d-grid gap-3 d-md-flex justify-content-md-center">
            <button className="btn btn-primary btn-lg shadow w-100 w-md-50">
              Crear Perfil
            </button>
            <button className="btn btn-danger btn-lg shadow w-100 w-md-50">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tu formulario adicional */}
      <div className="mt-3 w-100" style={{ maxWidth: "500px" }}>
      </div>
    </div>
  );
};
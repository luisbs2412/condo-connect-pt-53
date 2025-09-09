import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export const RegisterTenantPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [apartment, setApartment] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!firstName || !lastName || !email || !apartment) {
      setError("Por favor, completa todos los campos obligatorios (*).");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("El email no es válido.");
      return;
    }

    const tenant = {
      email,
      password: "12345678",      // Contraseña dummy requerida por backend
      first_name: firstName,
      last_name: lastName,
      apartment: apartment,      // Nuevo campo enviado
      role: "Tenant"
    };

    try {
      const res = await fetch(`${backendUrl}api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tenant),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      setSuccess("Tenant creado con éxito ✅");
      setFirstName("");
      setLastName("");
      setEmail("");
      setApartment("");
    } catch (err) {
      console.error(err);
      setError("Error al crear Tenant ❌: " + err.message);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light py-4">
      <h1 className="display-5 fw-bold mb-4 text-dark text-center">Admin Portal</h1>

      <div className="card shadow-lg rounded-4 p-3 p-md-4 w-100" style={{ maxWidth: "500px" }}>
        <div className="card-body text-center">
          <h2 className="h4 fw-semibold text-secondary mb-4">Datos del Inquilino</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre"
              className="form-control form-control-lg mb-3"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Apellido"
              className="form-control form-control-lg mb-3"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Número de APT"
              className="form-control form-control-lg mb-3"
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="form-control form-control-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="d-grid gap-3 d-md-flex justify-content-md-center">
            <button className="btn btn-primary btn-lg shadow w-100 w-md-50" onClick={handleSubmit}>
              Crear Perfil
            </button>
            <button className="btn btn-danger btn-lg shadow w-100 w-md-50">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTenantPage;

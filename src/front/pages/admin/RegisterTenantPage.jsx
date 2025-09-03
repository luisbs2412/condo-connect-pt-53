import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export const RegisterTenantPage = () => {
  const [nombre, setNombre] = useState('');
  const [apt, setApt] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name: nombre, apt_number: apt, email };

    try {
      const response = await fetch('http://localhost:5000/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMensaje(errorData.error || 'Error al crear perfil');
        return;
      }

      const result = await response.json();
      setMensaje('Perfil creado exitosamente');
      setNombre('');
      setApt('');
      setEmail('');
      console.log('Tenant creado:', result);

    } catch (error) {
      setMensaje('Error de conexión al servidor');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light py-4">
      <h1 className="display-5 fw-bold mb-4 text-dark text-center">Admin Portal</h1>

      <div className="card shadow-lg rounded-4 p-3 p-md-4 w-100" style={{ maxWidth: "500px" }}>
        <div className="card-body text-center">
          <h2 className="h4 fw-semibold text-secondary mb-4">Datos del Inquilino</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre" className="visually-hidden">Nombre y Apellido</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre y Apellido"
              className="form-control form-control-lg mb-3"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
              autoComplete="name"
            />

            <label htmlFor="apt" className="visually-hidden">Número de APT</label>
            <input
              type="text"
              id="apt"
              name="apt"
              placeholder="Número de APT"
              className="form-control form-control-lg mb-3"
              value={apt}
              onChange={e => setApt(e.target.value)}
              required
              autoComplete="address-line2"
            />

            <label htmlFor="email" className="visually-hidden">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="form-control form-control-lg"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <div className="d-grid gap-3 d-md-flex justify-content-md-center mt-4">
              <button className="btn btn-primary btn-lg shadow w-100 w-md-50" type="submit">Crear Perfil</button>
              <button className="btn btn-danger btn-lg shadow w-100 w-md-50" type="button" onClick={() => alert('Logout')}>Logout</button>
            </div>
          </form>

          {mensaje && <p className="mt-3 text-center text-primary">{mensaje}</p>}
        </div>
      </div>
    </div>
  );
};

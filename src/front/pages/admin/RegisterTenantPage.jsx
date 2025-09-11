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
      setError("All required fields must be completed (*).");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Invalid Email.");
      return;
    }

    const tenant = {
      email,
      password: "12345678",      
      first_name: firstName,
      last_name: lastName,
      apartment: apartment,      
      role: "tenant"
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

      setSuccess("Tenant created succesfully ✅");
      setFirstName("");
      setLastName("");
      setEmail("");
      setApartment("");
    } catch (err) {
      console.error(err);
      setError("Error creating Tenant ❌: " + err.message);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light py-4">
      <h1 className="display-5 fw-bold mb-4 text-dark text-center">Onboarding Form</h1>

      <div className="card shadow-lg rounded-4 p-3 p-md-4 w-100" style={{ maxWidth: "500px" }}>
        <div className="card-body text-center">
          <h2 className="h4 fw-semibold text-secondary mb-4">Tenant Information </h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="mb-4">
            <input
              type="text"
              placeholder="Name *"
              className="form-control form-control-lg mb-3"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name *"
              className="form-control form-control-lg mb-3"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Apartment Number *"
              className="form-control form-control-lg mb-3"
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email *"
              className="form-control form-control-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="d-grid gap-3 d-md-flex justify-content-md-center">
            <button className="btn btn-primary btn-lg shadow w-100 w-md-50" onClick={handleSubmit}>
              Create Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTenantPage;

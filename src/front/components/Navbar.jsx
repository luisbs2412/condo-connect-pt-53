import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('');
const navigate = useNavigate()
console.log(user);


  const handleChange = (e) => {
    const {value, name} = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleUserSubmit = (e) => {
    e.preventDefault()
    //todo: Agrgar Logica que registre el usuario
    console.log(user)
  }

  const handleUserLogin = (e) => {
    e.preventDefault()
    setError('');

    if (!user.email || !user.password) {
        setError('El correo electrónico y la contraseña son obligatorios.');
        return; // Detiene la función si los campos están vacíos
    }
    fetch(`${backendUrl}api/user/login`,{
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      if(response.status != 200){
        return response.json().then(errorData => {
                throw new Error(errorData.message || 'Ocurrió un error inesperado.');
      });
    }
      return response.json();
    })
    .then(data => {
        localStorage.setItem('access_token', data.token);
        if (data.role === 'Admin') {
            navigate('/admin/incidentsList');
        } else {
            navigate('/tenant/operationsform'); 
        }
    })
    .catch(error => {
        setError(error.message || 'No se pudo conectar con el servidor.');
        console.error('Error:', error);
    });
    console.log(user)
  }

  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          CondoConnect
        </a>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido colapsable */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
            <li className="nav-item ms-lg-3">
              <div className="dropdown">
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                  Login
                </button>
                <form className="dropdown-menu p-4 mt-2 dropdown-menu-end" style={{ width: '300px' }} onSubmit={handleUserSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleDropdownFormEmail2" className="form-label">Email address</label>
                    <input onChange={handleChange} name="email"
                     type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleDropdownFormPassword2" className="form-label">Password</label>
                    <input onChange={handleChange} name="password" type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Password" />
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="dropdownCheck2" />
                      <label className="form-check-label" htmlFor="dropdownCheck2">
                        Remember me
                      </label>
                      {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    </div>
                  </div>
                  <button onClick={handleUserLogin} type="submit" className="btn btn-primary">Sign in</button>
                </form>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

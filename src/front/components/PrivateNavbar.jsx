import React from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useNavigate, Link } from 'react-router-dom';
import Welcome from './Welcome';

const PrivateNavbar = () => {
  const { store } = useGlobalReducer();
  const navigate = useNavigate();
  const setUser = (user) => {
    // This function should update the user state in your application
    // Implementation depends on how you manage state (e.g., Context API, Redux, etc.)
  }
  const role = store?.user?.role;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">CondoConnect</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {role === "Admin" && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/incidentsList">Incidents</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/registerTenant">Register Tenant</Link>
                  </li>
                </>
              </ul>
              )}
              {role === "Tenant" && (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/tenant/incidents">Incidents</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/tenant/reservations">Reservations</Link>
                  </li>
 feature/reservationslist
                   <li className="nav-item">
                    <Link className="nav-link" to="/tenant/reservationslist">My Reservations</Link>

                  <li className="nav-item">
                    <Link className="nav-link" to="/tenant/viewincidents">My Incidents</Link>
 main
                  </li>
                </>
                </ul>
              )}
          </div>
          <span>
                <strong className="me-3">Welcome, {store.user.user?.first_name}</strong>
          </span>
           <span>
                <button className="btn btn-outline-dark" onClick={handleLogout}>Logout</button>
            </span>
        </div>
      </nav>
    </>
  )
};

export default PrivateNavbar;
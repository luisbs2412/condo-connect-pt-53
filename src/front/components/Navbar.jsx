import { Link } from "react-router-dom";
import RigoBaby from "../assets/img/rigo-baby.jpg";
import icono_light from "../assets/img/icono_light.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
         CondoConnect
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex ms-auto align-items-center">
            <a className="nav-link me-3 active" aria-current="page" href="#">
              Home
            </a>
            <a className="nav-link me-3" href="#">
              About
            </a>
            <a className="nav-link me-3" href="#">
              Contact
            </a>

            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

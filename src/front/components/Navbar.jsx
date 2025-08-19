import { Link } from "react-router-dom";
import RigoBaby from "../assets/img/rigo-baby.jpg";
import icono_light from "../assets/img/icono_light.png";

export const Navbar = () => {

	return (
		<nav className="navbar"  style={{"backgroundColor": "#f4f5f6"}}>
			<div className="container">
				<Link to="/">
					{/* <span className="navbar-brand mb-0 h1">CondoConect</span> */}
					<img src={icono_light}  alt="" />
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-sm btn-primary">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
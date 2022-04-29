import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<a className="navbar-brand" href="/">
					Navbar
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className={(nav) => (nav.isActive ? "active" : "")}>
							<NavLink className="nav-link" to="/">
								Accueil
							</NavLink>
						</li>
						<li className={(nav) => (nav.isActive ? "active" : "")}>
							<NavLink className="nav-link" to="/test">
								Test
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;

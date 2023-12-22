import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Navbar = () => {
	const {store, actions} = useContext(Context)

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">API de Usarios</span>
				</Link>
				{store.auth === true ? null : 				
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-secondary me-2">Login</button>
					</Link>
					<Link to="/signup">
						<button className="btn btn-secondary">Signup</button>
					</Link>
				</div>
				}
				{store.auth === true ?
				<>
				<Link to="/private">
					<button className="btn btn-secondary">Volver al Perfil</button>
				</Link>
				<Link to="/">
					<button onClick={()=>actions.logout()} className="btn btn-secondary">Logout</button>
				</Link>
				</> : null }
			</div>
		</nav>
	);
};


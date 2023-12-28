import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
	<>
    <div className="mt-2">
      <nav className="navbar navbar-light bg-body-tertiary mx-auto" style={{ width: "90%", backgroundColor: "#393638d4", borderRadius: "30px" }}>
        <div className="container d-flex align-items-center">
          {/* Primera Mitad */}
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <span className="navbar-brand mb-0 h1">
              <p className="ms-2 mb-0" style={{color:"#ffffff", fontFamily:""}}>Despensa Digital</p>
            </span>
          </Link>

          {/* Segunda Mitad */}
          <div className="ms-auto d-flex">
            {store.auth === true ? null : (
              <>
                <Link to="/login">
                  <button className="btn btn-secondary me-2" style={{ borderRadius: "30px" }}>Login</button>
                </Link>
                <Link to="/signup">
                  <button className="btn btn-secondary" style={{ borderRadius: "30px" }}>Signup</button>
                </Link>
              </>
            )}
            {store.auth === true ? (
              <>
                <Link to="/private">
                  <button className="btn btn-secondary">Volver al Perfil</button>
                </Link>
                <Link to="/">
                  <button onClick={() => actions.logout()} className="btn btn-secondary">
                    Logout
                  </button>
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
</>
  );
};

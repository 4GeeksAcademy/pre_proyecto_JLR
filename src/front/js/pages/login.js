import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [user_name, setUser_name] = useState('')
  const [password, setPassword] = useState("");
  const {store, actions} = useContext(Context)

  function sendData(e) {
    e.preventDefault();
    actions.login(user_name, password)
    .then((result) => {
      if(result.status === 401) {
          alert("Error al iniciar sesion, revisa tu nombre de usuario o password");
          setUser_name("")
          setPassword("");
      }
  })
    

  }

  return (
    
    <div>
      {store.auth === true ? <Navigate to="/private"/> : null}
      <div className="container">
        <h1>Login</h1>
      </div>
      <div className="container border">
        <form onSubmit={sendData}>
          <label>
            <div className="row mt-3 ">
              <p className="ms-2">Nombre de usuario:</p>
              <div className="input-group mb-3 col-12">
                <input
                  value={user_name}
                  onChange={(e) => setUser_name(e.target.value)}
                  type="string"
                  className="form-control"
                  placeholder="Nombre de usuario"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <p className="ms-2">Contraseña usuario:</p>
            <div className="input-group mb-3 col-12">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
                aria-describedby="basic-addon1"
              />
            </div>
          </label>
          <div className="input-group mb-3 col-12">
            <button type="submit" className="btn btn-secondary">
              Entrar
            </button>
          </div>
          <Link to="/">
            <button className="btn btn-light mb-4">Volver al home</button>
          </Link>
        </form>
      </div>
    </div>
  );
};
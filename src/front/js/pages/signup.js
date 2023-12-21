import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] =useState('')

    function sendData(e){
        e.preventDefault()
        console.log("send data")
        console.log(email, password)
    }


    return (
        <>
        <div>
            <div className="container">
            <h1>Signup</h1>
            </div>
            <div className="container border">
            <form onSubmit={sendData}>
                <label>
                <div className="row mt-3 ">
                <p className="ms-2">Email de <b>nuevo</b> usuario:</p>
                    <div className="input-group mb-3 col-12">
                        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" placeholder="Email" aria-describedby="basic-addon1"/>
                    </div>
                </div>
                <p className="ms-2">Contraseña de <b>nuevo</b> usuario:</p>
                <div className="input-group mb-3 col-12">
                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control" placeholder="Password" aria-describedby="basic-addon1"/>
                </div>
                </label>
                <div className="input-group mb-3 col-12">
                <button type="submit" className="btn btn-secondary">Registrarse</button>
                </div>
                <Link to="/">
				<button className="btn btn-light mb-4">Volver al home</button>
			</Link>
            </form>
            </div>
        </div>
        </>
    )}

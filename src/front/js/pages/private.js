import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/cohete.png";



export const Private = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
        <div className="text-center mt-5">
            <h1>Bienvenido <b>{store.email}</b> esta es tu pagina privada.</h1>
        </div>

        </>
    );
};
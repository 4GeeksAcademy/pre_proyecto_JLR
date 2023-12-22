import React, { useContext, useEffect, Componen } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/cohete.png";
import ReactPlayer from 'react-player'



export const Private = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
        <div className="text-center mt-5">
            <h1>Bienvenido <b>{store.email}</b> esta es tu pagina privada.</h1>
        </div>


        <div>
        <ReactPlayer
          url='https://www.youtube.com/watch?v=gtckSqaXCk8'
          className='react-player'
          playing={false}
          width='100%'
          height='100%'/>
         </div>

         <div className="text-center mt-5">
            <h2>Donde guardas las canciones que te encantan pero, no se las muestras a nadie</h2>
        </div>


        

        </>
    );
};
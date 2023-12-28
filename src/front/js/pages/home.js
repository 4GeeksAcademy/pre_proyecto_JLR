import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Login } from "./login";
import cabinet from "../../img/cabinet.png";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>

		<div className="mt-5">
		<div class="p-5 mb-4 ms-3 bg-body-tertiary rounded-3" style={{backgroundColor:"red"}}>
		<div class="container-fluid py-5">
		  <h1 class="display-5 fw-bold">Bienvendio a tú despensa digital</h1>
		  <p class="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
		</div>
	  	</div>
			<div class="container" style={{padding:"0", margin:"2% 5%"}}>
  			<div class="row" style={{padding:"0", margin:"0"}}>

    		<div class="col-md-6">
			<Login />
   			</div>

    		<div class="col-md-6">
			<img style={{width:"60%"}} src= {cabinet}></img>
    		</div>

 			</div>
			</div>

			<Link  to="/create_product">
					<button style={{marginTop:"90px"}} className="btn btn-secondary">BORRAR AL TERMINAAAR</button>
				</Link>
		</div>
		</>
	);
};

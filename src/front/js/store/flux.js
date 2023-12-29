const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false,
			user_name: null

		},
		actions: {

			login: async (user_name, password) => {
				try {
					console.log("login");
			
					const requestOptions = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({user_name, password })
					};
			
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, requestOptions);
					const data = await response.json();
			
					console.log(response.status);
			
					if (response.status === 200) {
						setStore({ auth: true, user_name: data.user_name });
						localStorage.setItem("token", data.access_token);
					} else if (response.status === 401) {
						console.log("Unauthorized");
					}
			
					return { status: response.status, data };
				} catch (error) {
					console.error("Error during login:", error);
					return { status: 500, data: { message: "Internal Server Error" } };
				}
			},

			signup: async (user_name, email, password) => {
				try {
					console.log("signup");
					const requestOptions = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							user_name: user_name,
							email: email,
							password: password
						}),
					};
			
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", requestOptions);
					const data = await response.json();
					console.log(response.status);
			
					if (response.status === 200) {
						return { status: response.status, data: data };
					} else if (response.status === 401) {
						return { status: response.status, data: data };

					} else throw new Error("Error al crear el usuario")
				} catch (error) {
					console.error("Error durante signup:", error);
					throw error; // Importante: debes volver a lanzar el error para que se maneje en la función llamadora
				}
			},


			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			create_product: async (Nombre, Peso_cantidad, Formato, Notas) => {
				try {
					const requestOptions = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						},
						body: JSON.stringify({
							Nombre: Nombre,
							Peso_cantidad: Peso_cantidad,
							Formato: Formato,
							Notas: Notas,
							user_name: localStorage.getItem('user_name') // Agregamos el nombre de usuario al cuerpo de la solicitud
						})
					};
			
					const response = await fetch(`${process.env.BACKEND_URL}/api/producto`, requestOptions);
					const data = await response.json();
			
					return data;
				} catch (error) {
					console.error("Error during create_product:", error);
					throw error;
				}
			},

			logout: (index, color) => {
				console.log("Estas tratanto de salir")
				setStore({ auth: false })
				localStorage.removeItem("token");
			}


		}
	};
};

export default getState;

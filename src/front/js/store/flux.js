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
			email: null

		},
		actions: {

			login: async (email, password) => {
				try {
					console.log("login");
			
					const requestOptions = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
					};
			
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, requestOptions);
					const data = await response.json();
			
					console.log(response.status);
			
					if (response.status === 200) {
						setStore({ auth: true, email });
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

			signup: async (email, password) => {
				try {
					console.log("signup");
					const requestOptions = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: email,
							password: password,
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
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
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

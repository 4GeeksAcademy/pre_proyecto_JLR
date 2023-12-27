import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CreateProduct = () => {
    const { actions } = useContext(Context);
    const [productData, setProductData] = useState({
        Nombre: "",
        Peso_cantidad: "",
        Formato: "",
        Notas: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const responseData = await actions.create_product(
                productData.Nombre,
                productData.Peso_cantidad,
                productData.Formato,
                productData.Notas
            );

            console.log(responseData); // Aquí puedes hacer algo con la respuesta del servidor, por ejemplo, redireccionar a otra página
            
            // Si la respuesta es exitosa (código 200), actualiza el estado con valores vacíos
            if (responseData.msg && responseData.msg.includes("se agregó correctamente a tu alacena virtual")) {
                setProductData({
                    Nombre: "",
                    Peso_cantidad: "",
                    Formato: "",
                    Notas: ""
                });
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            // Manejar el error según tus necesidades
        }
    };

    

    return (
        <>
            <div>
                <div className="container">
                    <h1>Create Product</h1>
                </div>
                <div className="container border">
                    <form onSubmit={handleSubmit}>
                        <div className="row mt-3">
                            <p className="ms-2">Nombre:</p>
                            <div className="input-group mb-3 col-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del producto"
                                    aria-describedby="basic-addon1"
                                    name="Nombre"
                                    value={productData.Nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <p className="ms-2">Peso:</p>
                            <div className="input-group mb-3 col-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Peso o cantidad del producto"
                                    aria-describedby="basic-addon1"
                                    name="Peso_cantidad"
                                    value={productData.Peso_cantidad}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <p className="ms-2">Formato:</p>
                            <div className="input-group mb-3 col-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Formato del producto"
                                    aria-describedby="basic-addon1"
                                    name="Formato"
                                    value={productData.Formato}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <p className="ms-2">Notas:</p>
                            <div className="input-group mb-3 col-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Notas del producto"
                                    aria-describedby="basic-addon1"
                                    name="Notas"
                                    value={productData.Notas}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="input-group mb-3 col-12">
                            <button type="submit" className="btn btn-secondary">Create Product</button>
                        </div>
                        <Link to="/">
                            <button className="btn btn-light mb-4">Back to Home</button>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};
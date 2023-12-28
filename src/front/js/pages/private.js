import React, { useContext, useEffect, Component } from "react";
import { Context } from "../store/appContext";
import { useState } from 'react'
import { CreateProduct } from "./create_a_product";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        console.log('User Name:', store.user_name);
    }, [store.user_name]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="text-center mt-5">
                <h1>Bienvenido <b>{store.user_name}</b> esta es tu pagina privada.</h1>
            </div>

            {/* Botón para abrir el modal */}
            <button type="button" className="btn btn-primary" onClick={handleOpenModal}>
                Crear Producto
            </button>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Crear nuevo producto para tu alacena</h1>
                                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Contenido del modal */}
                                <CreateProduct />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center mt-5">
                <h2>Donde guardas las canciones que te encantan pero no se las muestras a nadie</h2>
            </div>
        </>
    );
};
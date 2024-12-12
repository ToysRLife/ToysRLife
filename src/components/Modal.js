// Modal.js

import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 25,
                left: 25,
                width: "80%",
                height: "80%",
                background: "rgba(255,255, 255, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
                {children}
        </div>
    );
};

export default Modal;
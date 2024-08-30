import React, { useEffect } from "react";
import Swal from "sweetalert2";

function Alerta({ alerta }) {
    useEffect(() => {
        if (alerta && alerta.msg) {
            Swal.fire({
                title: alerta.msg,
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff url(/images/trees.png)",
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("/images/nyan-cat.gif")
                  left top
                  no-repeat
                `,
                timer: 3000, // Mostrar la alerta por 3 segundos
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
                willClose: () => {
                    Swal.hideLoading();
                }
            });
        }
    }, [alerta]);

    return null;
}

export default Alerta;

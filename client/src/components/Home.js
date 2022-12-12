// import "./Home.css";
// import foto from "../img/dogimg.png";
// import { Link } from "react-router-dom";
import React from 'react';

// export const Home = () => {
//   return (
//     <div>All about dogs</div>
//   )
// }

// export default Home;

import "./Home.css";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className= "fondo-home">
            <div className= "div-container-home">
                <div className= "foto-perrito-container">
                    {/* <img className= "foto-perrito-home" src= {FotoPerrito}></img> */}
                </div>
                {/* <div>
                    <img src= {rectangulo}></img> 
                </div> */}
                <div className= "contenedor-titulo-home">
                    <div className= "titulo-home-container">
                        <p className= "titulo-home">All about dogs</p>
                    </div> 
                    <div className= "subtitulo-home-container">
                        <p className= "subtitulo-home">Toda la información sobre perros que buscas, está acá.</p>
                        <Link to= "/buscar"><button className= "boton-home">ver más</button> </Link>                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
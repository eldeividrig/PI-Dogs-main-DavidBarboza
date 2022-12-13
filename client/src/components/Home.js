import "./Home.css";
import foto from "../img/Group 9.png";
import { Link } from "react-router-dom";
import React from "react";

export const Home = () => {
  return (
    <div className="fondoHome">
      <div className="containerHome">
        <div className="photoDog">
          <img className="photoDogHome" src={foto} alt="Foto Perro Home"/>
        </div>
      </div>
      <div className="tittleHome">
        <div className="containerTittle">
          <p className="tittle">Todas las Razas</p>
        </div>
        
          <div className="containerSubtittle">
            <p className="subtittle">
              Entrá aca para ver toda la Información de las razas de perros
            </p>
            <Link to="/buscar">
              <button className="button">Entrar</button>
            </Link>
          </div>
        
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import axios from "axios";

export default function Buscar() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const razadogs = useSelector((state) => state.razadogs);
  const [peso, setPeso] = useState("");
  const [orderAlf, setOrderAlf] = useState("");
  const [tempSelect, settemSelect] = useState("");
  const [razaSelect, setRazaSelect] = useState("");
  const [currentPAga, setCurrentPage] = useState(1);
  const [itemPorPag, setItemPorPag] = useState(4);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/temperamentos`)
      .then((rta) => {
        dispatch({
          type: "TEMPERAMENTOS",
          payload: rta.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/dogs`)
      .then((rta) => {
        dispatch({
          type: "RAZAS_DOGS",
          payload: rta.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="fondo">
      <div>
        <div>
          <SearchBar />
          <div>
            <Link to="/crearraza">
              <button className="botonCrear">Crear Raza</button>
            </Link>
          </div>
        </div>
        <div containerSelect>
          <div className="selectContainer">
            <p>Ordenar por peso:</p>
            <select>
              <option value="liviano">Los mas livianos primero</option>
              <option value="pesado">Los mas pesados primero</option>
            </select>
          </div>
          <div className="selectContainer">
            <p>Ordenar Alfabeticamente:</p>
            <select>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
          <div className="selectContainer">
            <p>Filtrar por Temperamento:</p>
            <select>
              <option>Seleccionar Temperamento</option>
            </select>
          </div>
          <div className="selectContainer">
            <p>Filtrar por Raza:</p>
            <select>
              <option>Seleccionar Raza</option>
            </select>
          </div>
        </div>
      </div>
      <div>Lista de Razas</div>
      <div>Paginación</div>
    </div>
  );
}

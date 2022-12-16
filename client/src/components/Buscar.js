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
  const [tempSelect, setTemSelect] = useState("");
  const [razaSelect, setRazaSelect] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPorPag, setItemPorPag] = useState(4);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/temperaments`)
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

  const pesoSelectedChange = e => {
    if (e.target.value === "liviano") {
      dispatch({
        type: "ordenarLiviano",
      });
    }else if (e.target.value === "pesado"){
      dispatch({
        type: "ordenarPesado",
      })
    }
    setPeso(e.target.value);
  }

  const alfabetSelectedChange = e => {
    if (e.target.value === "asc-desc") {
      dispatch({
        type: "ordenar-asc-desc",
      });
    }else if (e.target.value === "desc-asc"){
      dispatch({
        type: "ordenar-desc-asc",
      })
    }
    setOrderAlf(e.target.value);
  }

  const temperamentChange = (e) => {
    let temperament = e.target.value;
    setTemSelect(temperament);
  }

  const razaChange = e => {
    let raza = e.target.value;
    setRazaSelect(raza);
  }

  const indexUltimoItem = currentPage *itemPorPag;
  const indexPrimerItem = indexUltimoItem - itemPorPag;

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
            <select value={peso} onChange={pesoSelectedChange}>
              <option value="liviano">Los mas livianos primero</option>
              <option value="pesado">Los mas pesados primero</option>
            </select>
          </div>
          <div className="selectContainer">
            <p>Ordenar Alfabeticamente:</p>
            <select value={orderAlf} onChange={alfabetSelectedChange}>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
          <div className="selectContainer">
            <p>Filtrar por Temperamento:</p>
            <select onChange={temperamentChange}>
              <option value={""}>Seleccionar Temperamento</option>
              {temperaments.map(e => (
                <option value={e.name}>{e.name}</option>
              ))}
            </select>
          </div>
          <div className="selectContainer">
            <p>Filtrar por Raza:</p>
            <select onChange={razaChange}>
              <option value={""}>Seleccionar Raza</option>
              {razadogs.map(e=>(
                <option value={e.name}>{e.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div>Lista de Razas</div>
      <div>
        Paginacion
      </div>
    </div>
  );
}

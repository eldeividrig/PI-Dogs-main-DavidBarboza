import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./DogDetail.css";
import "./CrearRaza.css";

export const CrearRaza = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [razaNueva, setRazaNueva] = useState({
    name: "",
    altura: "",
    peso: "",
    años: "",
  });
  const [tempUltimo, setTemUltimo] = useState({});

  const selectedChange = (e) => {
    const { name, value } = e.target;
    setRazaNueva({ ...razaNueva, [name]: value });
  };

  const selectedChangeTemperament = (e) => {
    const { id, value } = e.target;
    setTemUltimo({ ...tempUltimo, [id]: value });
  };

  const CrearRazaNueva = () => {
    let temperamentsId = Object.keys(tempUltimo);
    // let temperamentsId = [1, 2, 3, 7, 21];
    let { name, altura, peso, años } = razaNueva;
    axios
      .post(`http://localhost:3001/dogs`, { name, altura, peso, años, temperamentsId })
      .then((rta) => {
        console.log(rta);
        alert("Raza Creada");
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo crear la raza");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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

  return (
    <div className="fondo-dog-detail">
      <div className="container-amarillo">
        <form className="agregarRaza" onSubmit={handleSubmit}>
          <div className="container-desc-img">
            <div className="descripcion-raza">
              <p> Nombre:
                <input
                  name="name"
                  value={razaNueva.name}
                  onChange={selectedChange}
                  placeholder="nombre"
                />
              </p>
              <div>
                <p>Temperamentos:</p>
                <div>
                  {temperaments.map((el) => (
                    <div>
                      <input
                        type="checkbox"
                        name="temperament"
                        value={el.name}
                        id={el.id}
                        onChange={selectedChangeTemperament}
                      />
                      <label for="temperament">{el.name}</label>
                    </div>
                  ))}
                </div>
                <p>
                  Altura:
                  <input
                    name="altura"
                    value={razaNueva.altura}
                    onChange={selectedChange}
                    placeholder="altura"
                  /> cm.
                </p>
                <p> Peso:
                  <input
                    name="peso"
                    value={razaNueva.peso}
                    onChange={selectedChange}
                    placeholder="peso"
                  /> kg.
                </p>
                <p>
                  {" "}
                  Años de vida:
                  <input
                    name="años"
                    value={razaNueva.años}
                    onChange={selectedChange}
                    placeholder="años de vida"
                  />
                </p>
              </div>
              <div>
                <button
                  className="boton-agregar-perroo"
                  onClick={CrearRazaNueva}
                > Agregar perro
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

import React from 'react';
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import "./DogDetail.css"
import { useSelector } from "react-redux";

export default function DogDetail() {
    const temperaments = useSelector((state) => state.temperaments);
    const [dogDetail, setDogDetail] = useState({ name: "", temperament: "", peso: "", años: "", altura: "", fotoid: "" })
    let { id } = useParams();
    let url = 'https://e7.pngegg.com/pngimages/552/1/png-clipart-dogs-dogs.png';

    useEffect(() => {
        traerDetalles()
    }, []);

    const traerDetalles = () => {
        axios.get(`http://localhost:3001/dogs/${id}`)
            .then((res) => {
                setDogDetail({
                    name: res.data.name,
                    temperament: res.data.temperament,
                    altura: res.data.height?.metric || res.data.altura,
                    peso: res.data.weight?.metric || res.data.peso,
                    años: res.data.life_span || res.data.años,
                    fotoid: res.data.image?.url || url
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="fondoDogDetail">
            <div className="containerAmarillo">
                <div className="containerImg">
                    <img className="imgPerro" src={dogDetail.fotoid}></img>
                </div>
                <div className="descripcionPerro">
                    <p>{dogDetail.name}</p>
                    <div>
                        <p>Temperamento: {dogDetail.temperament}</p>
                        <p>Altura:{dogDetail.altura}</p>
                        <p>Peso: {dogDetail.peso}</p>
                        <p>Años de vida: {dogDetail.años}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

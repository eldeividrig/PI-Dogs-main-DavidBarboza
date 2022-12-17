import React from 'react';
import { Link } from 'react-router-dom';
import "./DogCard.css";

export default function DogCard({name, temperament, id, img}) {
  return (
    <Link to={`/dog-detail/${id}`}>
        <div className="cardContainer">
            <img className='imgDog' src={img} alt='img'/>
            <div className='tituloDog'>
                <p className='tituloCard'>{name}</p>
                <br />
                <p className='temperamentoCard'>Temperamento:</p>
                <br />
                <p>{temperament}</p>
            </div>
        </div>
    </Link>
  )
}

import React from 'react';
import "./Paginacion.css";

export const Paginacion = ({ itemsPorPag, totalPosts, paginate }) => {
  const pageNumbers = [];
  const division = Math.ceil(totalPosts / itemsPorPag);
  for (let i = 1; i <= division; i++) {
    pageNumbers.push(i)    
  }
  return (
    <div>
      <div className='div-paginador'>
        {pageNumbers.map(number => (
          <div>
            <button className='boton-paginador' onClick={()=> paginate(number)}>
              {number}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

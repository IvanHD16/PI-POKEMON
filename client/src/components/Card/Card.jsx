import React from 'react';
import './Card.css'
import {Link} from 'react-router-dom'

const Card = ({id,nombre,imagen, ataque, defensa, velocidad, altura, peso, tipo}) => {
  return (
    <Link to={`/detail/${id}`}>
      <div className='card-cont'>
        <div>
          <h3>{id}</h3>
        </div>
        <div>
          <img src={imagen} alt={`Imagen de ${nombre}`}/>
        </div>
        <div>
          <h4>Nombre: {nombre}</h4>
        </div>
        {ataque && (
          <div>
            <h4>Ataque: {ataque}</h4>
          </div>
        )}
        {defensa && (
          <div>
            <h4>Defensa: {defensa}</h4>
          </div>
        )}
        {velocidad && (
          <div>
            <h4>Velocidad: {velocidad}</h4>
          </div>
        )}
        {altura && (
          <div>
            <h4>Altura: {altura/10} m</h4>
          </div>
        )}
        {peso && (
          <div>
            <h4>Peso: {peso} kg</h4>
          </div>
        )}
        <div>
          <h4>Tipos: {tipo}</h4>
        </div>
      </div>
    </Link>
  )
}

export default Card
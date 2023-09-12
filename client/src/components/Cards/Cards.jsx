import React from 'react';
import Card from '../Card/Card';
import './Cards.css';

const Cards = ({ allPokes }) => {  

  return (
    <div className='cards-cont'>
      <div className='show-cards-cont'>
        {allPokes.length > 0 ? (
          allPokes.map((poke) => (
            <Card
              key={poke.id}  
              id={poke.id}
              imagen={poke.imagen}
              nombre={poke.nombre}
              ataque={poke.ataque}
              defensa={poke.defensa}
              velocidad={poke.velocidad}
              altura={poke.altura}
              peso={poke.peso}
              tipo={poke.tipo}
            />
          ))
        ) : (
          <p>LOADING...</p>
        )}
      </div>
    </div>
  );
};

export default Cards;
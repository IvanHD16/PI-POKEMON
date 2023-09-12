import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";

const Detail = () => {
    const {id} = useParams();
    const [poke, setPoke] = useState({})
    useEffect(()=>{
        const axiosData = async ()=>{
          try {
            const data = (await axios(`http://localhost:3001/pokemons/${id}`)).data
            if (data.nombre) {
              setPoke(data);
            } else {
              window.alert('No hay personajes con ese ID');
            }
          } catch (error) {
            console.error(error.message);
          }
        }
        axiosData();

        return () => {
          setPoke({});
        };
    }, [id]);

    return(
        <div>
            {
                poke.nombre?
                (
                    <>
                        <h2>{poke.id}</h2>
                        <img src={poke.imagen} alt={poke.nombre} />
                        <h2>Nombre: {poke.nombre}</h2>
                        <h3>Vida: {poke.vida} hp</h3>
                        <h3>Ataque: {poke.ataque}</h3>
                        <h3>Defensa: {poke.defensa}</h3>
                        <h3>Velocidad: {poke.velocidad}</h3>
                        <h3>Altura: {poke.altura/10} m</h3>
                        <h3>Peso: {poke.peso} kg</h3>
                        <h3>Tipo: {poke.tipo}</h3>
                    </>
                ) : (<h3> Loading </h3>)
            }
            
        </div>
    )
}

export default Detail
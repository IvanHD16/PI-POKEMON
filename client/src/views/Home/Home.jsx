import React, { useEffect, useState } from "react";
import Cards from '../../components/Cards/Cards'
import { useDispatch, useSelector } from "react-redux";
import { filter, getPokes, order, paginado } from "../../redux/actions";
import './home.css'

function Home(){
    
    const [name, setName] = useState('')
    const [tipo, setTipo] = useState('')

    const handleChange = (event)=>{
        setName(event.target.value)}

    const dispatch=useDispatch();
    const allPokes = useSelector((state)=>state.allPokes);

    const onSearch=(name)=>{
        dispatch(getPokes(name))
    }

    
    useEffect(()=>{
        dispatch(getPokes())
    },[])

    const pageHandler = (event) => {
        dispatch(paginado(event.target.name));
      };

    const orderHandler=(event)=>{
        dispatch(order(event.target.name))
    }

    const filterHandler=(event)=>{
        if(event.target.value !=='API' || event.target.value !== 'DB') setTipo(event.target.value)
        dispatch(filter(event.target.value))
    }

    return(
        <div className="home-cont">
            <div>
                <label>Quieres buscar un pokemon?</label>
                <input type='search' onChange={handleChange}/>
                <button onClick={()=>{
                    onSearch(name)}}>Buscar</button>
            </div>
            <div>
                <label>Ordenar por poder de ataque</label>
                <button name='Asc' onClick={orderHandler}>Ascendente</button>
                <button name='Desc' onClick={orderHandler}>Descendente</button>
            </div>
            <div>
                <label>Ordenar por poder orden alfabetico</label>
                <button name='A-Z' onClick={orderHandler}>A-Z</button>
                <button name='Z-A' onClick={orderHandler}>Z-A</button>
            </div>
            <div>
                <label>Filtrar por tipo</label>
                <select onChange={filterHandler} name="types" value={tipo}>
                    <option value="Normal">Normal</option>
                    <option value="Lucha">Lucha</option>
                    <option value="Volador">Volador</option>
                    <option value="Veneno">Veneno</option>
                    <option value="Tierra">Tierra</option>
                    <option value="Roca">Roca</option>
                    <option value="Bicho">Bicho</option>
                    <option value="Fantasma">Fantasma</option>
                    <option value="Acero">Acero</option>
                    <option value="Fuego">Fuego</option>
                    <option value="Agua">Agua</option>
                    <option value="Planta">Planta</option>
                    <option value="Eléctrico">Eléctrico</option>
                    <option value="Psíquico">Psíquico</option>
                    <option value="Hielo">Hielo</option>
                    <option value="Dragón">Dragón</option>
                    <option value="Siniestro">Siniestro</option>
                    <option value="Hada">Hada</option>
                    <option value="Sombra">Sombra</option>
                    <option value="Desconocido">Desconocido</option>
                </select>
            </div>
            <div>
                <label>Filtrar creado por el usuario</label>
                <button onClick={filterHandler} value='API'>API</button>
                <button onClick={filterHandler} value='DB'>Base de Datos</button>
            </div>
            <div>
                <Cards allPokes={allPokes}/>
            </div>
            <div className='next-prev-cont'>
                <button name='prev' onClick={pageHandler}>Pagina Anterior</button>
                <button name='next' onClick={pageHandler}>Siguiente Pagina</button>
            </div>
        </div>
    )
}

export default Home;
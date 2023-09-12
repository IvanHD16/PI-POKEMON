import React, { useState } from 'react'
import './Create.css'
import { postPoke } from '../../redux/actions';
import {useDispatch} from 'react-redux'

const Create = () => {
  
  const dispatch = useDispatch();

  const [state,setState] = useState({
    nombre:"",
    imagen:"",
    vida:"",
    ataque: "",
    defensa: "",
    velocidad:"",
    altura:"",
    peso:"",
    tipo:[],
  })
  const [error, setError]= useState({
    nombre:"*",
    imagen:"*",
    vida:"*",
    ataque: "*",
    defensa: "*",
    velocidad:"",
    altura:"",
    peso:"",
    tipo:"*",
  })

  const handleChange =(event)=>{
    if(event.target.name==='tipo') {
      if(!state.tipo.includes(event.target.value)){
        setState({...state, tipo: [...state.tipo, event.target.value]});
        validate({
          ...state,
          tipo: [...state.tipo, event.target.value]},event.target.name)
      } else {
        setState({...state,
          tipo: state.tipo.filter((tip)=>tip!==event.target.value)});
        validate({
          ...state,
          tipo: state.tipo.filter((tip)=>tip!==event.target.value)},event.target.name)
      }
    }
    else{
      setState({
        ...state,
        [event.target.name]: event.target.value,
      })
      validate({
        ...state,
        [event.target.name]: event.target.value},event.target.name)
    }
  }

  const disabler = ()=>{
    let disabled = true;
    for(let err in error){
      if (error[err]==='ok' || error[err]=== "") disabled=false;
      else {
        disabled=true;
        break}
    }
    return disabled;
  }

  const validate = (state,name)=>{
    if(name==="nombre"){
      if(state.nombre !== "") setError({...error, nombre:"ok"});
      else setError({...error, nombre:"campo requerido"})
    }
    if (name === "imagen") {
      if (state.imagen === "") setError({ ...error, imagen: "Campo requerido" });
      // else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(state.imagen))setError({ ...error, imagen: "La URL no es válida" });
      else setError({ ...error, imagen: "ok" });
    }
    if(name==="vida"){
      if(state.vida === "") setError({...error, vida:"campo requerido"});
      else if (!Number.isInteger(Number(state.vida)) || Number(state.vida)<1) setError({...error, vida:"Se requiere solo numeros enteros positivos"});
      else setError({...error, vida:"ok"});
    }
    if(name==='ataque'){
      if(state.ataque === "") setError({...error, ataque:"campo requerido"});
      else if (!Number.isInteger(Number(state.ataque)) || Number(state.ataque)<1) setError({...error, ataque:"Se requiere solo numeros enteros positivos"});
      else setError({...error, ataque:"ok"});
    }
    if(name==="defensa"){
      if(state.defensa === "") setError({...error, defensa:"campo requerido"});
      else if (!Number.isInteger(Number(state.defensa)) || Number(state.defensa)<1) setError({...error, defensa:"Se requiere solo numeros enteros positivos"});
      else setError({...error, defensa:"ok"});
    }
    if(name==="velocidad"){
      if (!Number.isInteger(Number(state.velocidad)) || Number(state.velocidad)<1) setError({...error, velocidad:"Se requiere solo numeros enteros positivos"});
      else setError({...error, velocidad:"ok"});
    }
    if(name==="altura"){
      if (!Number.isInteger(Number(state.altura)) || Number(state.altura)<1) setError({...error, altura:"Se requiere solo numeros enteros positivos"});
      else setError({...error, altura:"ok"});
    }
    if(name==="peso"){
      if (!Number.isInteger(Number(state.peso)) || Number(state.peso)<1) setError({...error, peso:"Se requiere solo numeros enteros positivos"});
      else setError({...error, peso:"ok"});
    }
    if(name==='tipo'){
      if(!state.tipo.length) setError({...error, tipo:"Selecciona al menos un tipo"});
      else setError({...error, tipo:"ok"});
    }
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log(e)
    const stateParsed = {
      nombre: state.nombre,
      imagen: state.imagen,
      vida: Number(state.vida),
      ataque: Number(state.ataque),
      defensa: Number(state.defensa),
      velocidad: Number(state.velocidad),
      altura: Number(state.altura),
      peso: Number(state.peso),
      tipo: state.tipo,
    }
    dispatch(postPoke(stateParsed))
  }
  
  return (
    <div className='form-cont'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Nombre</label>
        <input name= "nombre" onChange={handleChange} type="text" /> <p>{error.nombre}</p>
        <label htmlFor="">Imagen</label>
        <input name= "imagen" onChange={handleChange} type="text" /><p>{error.imagen}</p>
        <label htmlFor="">Vida</label>
        <input name= "vida" onChange={handleChange} type="text" /><p>{error.vida}</p>
        <label htmlFor="">Ataque</label>
        <input name= "ataque" onChange={handleChange} type="text" /><p>{error.ataque}</p>
        <label htmlFor="">Defensa</label>
        <input name= "defensa" onChange={handleChange} type="text" /><p>{error.defensa}</p>
        <label htmlFor="">Velocidad</label>
        <input name= "velocidad" onChange={handleChange} type="text" /><p>{error.velocidad}</p>
        <label htmlFor="">Altura</label>
        <input name= "altura" onChange={handleChange} type="text" /><p>{error.altura}</p>
        <label htmlFor="">Peso</label>
        <input name= "peso" onChange={handleChange} type="text" /><p>{error.peso}</p>
        <label htmlFor="">Tipo</label><p>{error.tipo}</p>
        <label>
            <input type="checkbox" name="tipo" value="normal" onChange={handleChange} /> Normal
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="fighting" onChange={handleChange} /> Pelea
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="flying" onChange={handleChange} /> Volador
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="poison" onChange={handleChange} /> Veneno
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="ground" onChange={handleChange} /> Tierra
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="rock" onChange={handleChange} /> Roca
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="bug" onChange={handleChange} /> Bicho
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="ghost" onChange={handleChange} /> Fantasma
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="steel" onChange={handleChange} /> Acero
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="fire" onChange={handleChange} /> Fuego
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="water" onChange={handleChange} /> Agua
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="grass" onChange={handleChange} /> Planta
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="electric" onChange={handleChange} /> Electrico
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="psychic" onChange={handleChange} /> Psiquico
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="ice" onChange={handleChange} /> Hielo
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="dragon" onChange={handleChange} /> Dragon
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="dark" onChange={handleChange} /> Oscuro
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="fairy" onChange={handleChange} /> Hada
        </label>
        <br />
        <label>
            <input type="checkbox" name="tipo" value="unknown" onChange={handleChange} /> Desconocido
        </label>

        <input disabled={disabler()} className='form-button' type="submit" value={'CREAR'}/>
      </form>
    </div>
  )
}

export default Create
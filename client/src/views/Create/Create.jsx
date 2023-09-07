import React, { useState } from 'react'
import './Create.css'

const Create = () => {
  const [state,setState] = useState({
    nombre:"",
    imagen:"",
    hp:"",
  })
  const [error, setError]= useState({
    nombre:"*",
    imagen:"*",
    hp:"*",
  })
  const handleChange =(event)=>{
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
    validate({
      ...state,
      [event.target.name]: event.target.value},event.target.name)
  }

  const disabler = ()=>{
    let disabled = true;
    for(let err in error){
      if (error[err]==='ok') disabled=false;
      else {
        disabled=true;
        break}
    }
    return disabled;
  }

  const validate = (state,nombre)=>{
    if(nombre==="nombre"){
      if(state.nombre !== "") setError({...error, nombre:"ok"});
      else setError({...error, nombre:"campo requerido"})
    }
    if(nombre==="imagen"){
      if(state.imagen !== "") setError({...error, imagen:"ok"});
      else setError({...error, imagen:"campo requerido"});
      //regex para url!!
    }
    if(nombre==="hp"){
      if(state.hp === "") setError({...error, hp:"campo requerido"});
      else if (!Number.isInteger(Number(state.hp)) || Number(state.hp)<1) setError({...error, hp:"Se requiere solo numeros enteros positivos"});
      else setError({...error, hp:"ok"});
    }
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log(state)
  }
  
  return (
    <div className='form-cont'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">primer campo</label>
        <input name= "nombre" onChange={handleChange} type="text" /> <p>{error.nombre}</p>
        <label htmlFor="">2do campo</label>
        <input name= "imagen" onChange={handleChange} type="text" /><p>{error.imagen}</p>
        <label htmlFor="">3er campo</label>
        <input name= "hp" onChange={handleChange} type="text" /><p>{error.hp}</p>
        <input disabled={disabler()} className='form-button' type="submit" value={'CREAR'}/>
      </form>
    </div>
  )
}

export default Create
import axios from "axios";
import { FILTER, GET_POKES, GET_POKES_ERROR, ORDER, PAGINATE } from "./actionTypes";


export const postPoke=(state)=>{
    return async function(dispatch){
        try {
             const  response = await axios.post('http://localhost:3001/pokemons', state);
            alert("Se creo el poke correctamente")
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}
export const getPokes=(name)=>{
    let query='';
    if(name) query=`?nombre=${name}`
    return async function(dispatch){
        try {
            const data= (await axios.get('http://localhost:3001/pokemons'+query)).data;
            dispatch({
                type: GET_POKES,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: GET_POKES_ERROR,
                payload: error.message })
        }
    }
}

export const paginado=(direccion)=>{
    return async  function(dispatch){
        try {
            dispatch({
                type: PAGINATE,
                payload: direccion
            })
        } catch (error) {
            throw Error (error)
        }
    }
}

export const order=(event)=>{
    return async  function(dispatch){
        try {
            dispatch({
                type: ORDER,
                payload: event
            })
        } catch (error) {
            throw Error (error)
        }
    }
}

export const filter=(filtro)=>{
    return async  function(dispatch){
        try {
            dispatch({
                type: FILTER,
                payload: filtro
            })
        } catch (error) {
            throw Error (error)
        }
    }
}
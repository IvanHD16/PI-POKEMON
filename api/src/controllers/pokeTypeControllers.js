const axios = require('axios')
// const createPokeType = async (nombre)=>{
//     const post = await Type.create(nombre);

// }

const getPokeType = async ()=>{
    const data = (await axios('https://pokeapi.co/api/v2/type')).data;
    const types = []
    data.results.forEach((type)=> types.push(type.name));
    return types;
}

module.exports = { getPokeType}
const {postPoke, getPokes, getPokeById, pokeDelete} = require('../controllers/pokeControllers');

let urlNext = "";
let urlPrev = "";

const getPokesHandler = async (req, res)=>{
    const {nombre} = req.query;
    // let url=`https://pokeapi.co/api/v2/pokemon/`;//
    // if(nombre==='next') url=urlNext;             //  codigo anterior nomas para analizar xd
    // if(nombre==='prev') url=urlPrev;             //
    try {
        const response = await getPokes(/*url, */nombre);
        // urlNext = response[0];                   //
        // urlPrev = response[1];                   //  codigo anterior 
        return res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getPokeHandlerById = async(req, res)=>{
    const {id} = req.params;
    try {
        const response = await getPokeById(id);
        return res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postPokeHandler = async (req, res) => {
    const {nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipo} = req.body;
    console.log(req.body)
    try {
        const response = await postPoke(nombre, imagen, vida, ataque, defensa, velocidad, altura, peso,tipo);
        console.log("ESTA ES LA RESPONSE: " + response)
        return res.status(201).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const delPokeH = async (req, res)=>{
    const {id} = req.params;
    try {
        await pokeDelete(id)
        res.status(200).send(`pokemon ${id} eliminado correctamente`)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getPokesHandler, postPokeHandler, getPokeHandlerById, delPokeH
}
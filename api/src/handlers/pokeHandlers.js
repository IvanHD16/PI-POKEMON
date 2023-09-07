const {postPoke, getPokes, getPokeById, pokeDelete} = require('../controllers/pokeControllers');

const getPokesHandler = async (req, res)=>{
    const {nombre} = req.query;
    try {
        const response = await getPokes(nombre);
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
    try {
        const response = await postPoke(nombre, imagen, vida, ataque, defensa, velocidad, altura, peso,tipo);
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
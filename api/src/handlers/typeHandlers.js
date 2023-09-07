const { getPokeType } = require("../controllers/pokeTypeControllers");

// const createPokeTypeHandler = async(req, res)=>{
//     const {nombre} = req.body;
//     try {
//         const response = await createPokeType(nombre);
//         res.status(200).json(response)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }

const getPokeTypeHandler = async (req,res)=>{
    try {
        const response = await getPokeType();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    getPokeTypeHandler
}
const { Router } = require('express');
const {getPokesHandler, postPokeHandler, getPokeHandlerById, delPokeH} = require('../handlers/pokeHandlers')

const pokeRouters = Router();

pokeRouters.get('/', getPokesHandler); // array de pokes y name por query
pokeRouters.get('/:id', getPokeHandlerById);
pokeRouters.post('/', postPokeHandler);
pokeRouters.delete('/:id', delPokeH);

module.exports = pokeRouters;
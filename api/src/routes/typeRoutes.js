const {Router} = require('express');
const { getPokeTypeHandler } = require('../handlers/typeHandlers');

const typeRouters = Router();

typeRouters.get('/', getPokeTypeHandler)

module.exports = typeRouters;
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokeRouters = require('./pokeRoutes')
const typeRouters = require('./typeRoutes')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokeRouters)
router.use('/types', typeRouters)

module.exports = router;

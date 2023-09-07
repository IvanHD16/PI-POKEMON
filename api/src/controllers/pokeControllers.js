const {Pokemon, Type} = require('../db');
const {Op} = require('sequelize');
const axios = require('axios')

const getPokesDB = async (nombre) => {
  if (nombre) {
    const pokeByName = await Pokemon.findAll({
      where: { nombre: { [Op.iLike]: `%${nombre}%` } },
      include: [{ model: Type, attributes: ['nombre'] }],
    });

    const pokeMaped = pokeByName.map((pokemon) => ({
      id: pokemon.id,
      nombre: pokemon.nombre,
      imagen: pokemon.imagen,
      vida: pokemon.vida,
      ataque: pokemon.ataque,
      defensa: pokemon.defensa,
      velocidad: pokemon.velocidad,
      altura: pokemon.altura,
      peso: pokemon.peso,
      Types: pokemon.Types.map((type) => ({ name: type.nombre })),
    }));

    return pokeMaped;
  }

  const pokesDB = await Pokemon.findAll({
    include: [{ model: Type, attributes: ['nombre'] }],
  });

  const pokeMaped2 = pokesDB.map((pokemon) => ({
    id: pokemon.id,
    nombre: pokemon.nombre,
    imagen: pokemon.imagen,
    vida: pokemon.vida,
    ataque: pokemon.ataque,
    defensa: pokemon.defensa,
    velocidad: pokemon.velocidad,
    altura: pokemon.altura,
    peso: pokemon.peso,
    types: pokemon.Types.map((type) => ({ name: type.nombre })),
  }));

  return pokeMaped2;
};


const getPokesAPI = async () =>{
    let allPokesAPI = []
    const page = (await axios(`https://pokeapi.co/api/v2/pokemon/`)).data;
    allPokesAPI.push(page.next, page.previous);
    const pokesObj = page.results
    const pokes = await Promise.all(pokesObj.map(async (poke) => {
    
        const pokeInfo = (await axios.get(poke.url)).data;
  
        const newPoke = {
            nombre: pokeInfo.name,
            imagen: pokeInfo.sprites.other.dream_world.front_default,
            tipo: pokeInfo.types[1]
            ?`${pokeInfo.types[0]['type']['name']}, ${pokeInfo.types[1]['type']['name']}`
            : pokeInfo.types[0]['type']['name'],
        };
  
        return newPoke;
      }));
  
      allPokesAPI = [...allPokesAPI, ...pokes]
      return allPokesAPI;
}

const getPokes = async (nombre)=>{
    if(nombre) {
        const pokesDB = await getPokesDB(nombre);
        const matchPokes = [];
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
            const data = response.data
            const poke = {
                nombre: data.name,
                id: data.id,
                imagen: data.sprites.other.dream_world.front_default,
                vida: data.stats[0]['base_stat'],
                ataque: data.stats[1]['base_stat'],
                defensa: data.stats[2]['base_stat'],
                velocidad: data.stats[5]['base_stat'],
                altura: data.height,
                peso: data.weight,
                tipo: data.types[1]
                ?`${data.types[0]['type']['name']}, ${data.types[1]['type']['name']}`
                : data.types[0]['type']['name'],
            }
            matchPokes.push(poke)
            
        } catch (error) {
            console.error(`Error al obtener datos del Pokemon desde la API: ${error.message}`);
        }
        matchPokes.push(...pokesDB);
        // if(!matchPokes.length) throw new Error(`No se encontro un pokemon con el nombre ${nombre}`)
        return matchPokes
    } else {
        const pokesDB = await getPokesDB();
        const pokesAPI = await getPokesAPI();
        const allPokes = [...pokesDB, ...pokesAPI];
        
        return allPokes;
    }
}

const getPokeById = async (id)=>{
    if(id>1010){
        const idDB = id-1010;
        const pokeById = await Pokemon.findOne({where: {id: idDB}});
        return pokeById;
    } else {
        const data = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
        
        const poke = {
            nombre: data.name,
            id: data.id,
            imagen: data.sprites.other.dream_world.front_default,
            vida: data.stats[0]['base_stat'],
            ataque: data.stats[1]['base_stat'],
            defensa: data.stats[2]['base_stat'],
            velocidad: data.stats[5]['base_stat'],
            altura: data.height,
            peso: data.weight,
            tipo: data.types[1]
            ?`${data.types[0]['type']['name']}, ${data.types[1]['type']['name']}`
            : data.types[0]['type']['name'],
        }
        return poke
    }
}

const postPoke = async (nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipos) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/type/');
    const dataFromAPI = response.data.results;

    dataFromAPI.forEach(async apiObj => {
      const objetoAInsertar = {
        nombre: apiObj.name,
      };
      await Type.create(objetoAInsertar);
    });

    const [newPoke, created] = await Pokemon.findOrCreate({
      where: { nombre },
      defaults: { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso },
    });

    if (newPoke) {
      for (const tipo of tipos) {
        const findType = await Type.findOne({ where: { nombre: tipo } });

        if (findType) {
          await newPoke.addType(findType);
        } else {
          console.error(`El tipo ${tipo} no se encontró.`);
          return null;
        }
      }

      console.log(
        created
          ? `Se ha creado un nuevo Pokémon ${newPoke.nombre} y se le han asignado los tipos: ${tipos.join(', ')}.`
          : `El Pokémon ${newPoke.nombre} ya existe y se le han asignado los tipos: ${tipos.join(', ')}.`
      );

      return newPoke;
    } else {
      console.error('Error al crear o encontrar el Pokémon.');
      return null;
    }
  } catch (error) {
    console.error('Error en postPoke:', error);
    return null;
  }
};

const pokeDelete = async(id)=> {
  await Pokemon.destroy({where: {id}})
}

module.exports = {
    getPokes, postPoke, getPokeById, pokeDelete
}
// const getPokesAPI = async () =>{
//     const allPokesAPI = []
//     for (let i = 1; i < 1011; i++) {
//         const data = (await axios(`https://pokeapi.co/api/v2/pokemon/${i}`)).data;
//         const newPoke = {
//             nombre: data.name,
//             id: data.id,
//             imagen: data.sprites.other.dream_world.front_default,
//             vida: data.stats[0]['base_stat'],
//             ataque: data.stats[1]['base_stat'],
//             defensa: data.stats[2]['base_stat'],
//             velocidad: data.stats[5]['base_stat'],
//             altura: data.height,
//             peso: data.weight,
//             tipo: data.types[1]
//             ?`${data.types[0]['type']['name']}, ${data.types[1]['type']['name']}`
//             : data.types[0]['type']['name'],
//         }
//         allPokesAPI.push(newPoke)
//     }
//     return allPokesAPI;
// }
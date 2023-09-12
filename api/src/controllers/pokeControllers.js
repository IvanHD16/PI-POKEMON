const {Pokemon, Type} = require('../db');
const {Op} = require('sequelize');
const axios = require('axios')

function traductorDeTipo(ingles) {
  const tipoEnEspanol = {
      normal: "Normal",
      fighting: "Lucha",
      flying: "Volador",
      poison: "Veneno",
      ground: "Tierra",
      rock: "Roca",
      bug: "Bicho",
      ghost: "Fantasma",
      steel: "Acero",
      fire: "Fuego",
      water: "Agua",
      grass: "Planta",
      electric: "Eléctrico",
      psychic: "Psíquico",
      ice: "Hielo",
      dragon: "Dragón",
      dark: "Siniestro",
      fairy: "Hada",
      unknown: "Desconocido",
      shadow: "Sombra"
  };

  return tipoEnEspanol[ingles] || "Desconocido";
}

const getPokesDB = async (nombre) => {
  let pokesDB = []
  if (nombre) {
      pokesDB = await Pokemon.findAll({
      where: { nombre: { [Op.iLike]: `%${nombre}%` } },//operador iLike busca con % los nombres que contienen el string y quita la sensitive case
      include: [{ model: Type, attributes: ['nombre'] }], //incluimos del modelo Type los atrubutos "nombre" que esten relacionados.
    });
  } else {pokesDB = await Pokemon.findAll({
    include: [{ model: Type, attributes: ['nombre'] }],
  })}
    const pokeMaped = pokesDB.map(pokemon => ({ //mapeamos porque findAll nos retorna un array de objetos
      id: pokemon.id + 1010,
      nombre: pokemon.nombre,
      imagen: pokemon.imagen,
      vida: pokemon.vida,
      ataque: pokemon.ataque,
      defensa: pokemon.defensa,
      velocidad: pokemon.velocidad,
      altura: pokemon.altura,
      peso: pokemon.peso,
      origen: 'DB',
      Types: pokemon.Types.map(type => type.nombre).join(', '), //mapeamos los valores uniendolos en un string
    }));

    return pokeMaped;
};

const getPokesAPI = async () => {
  const allPokesAPI = [];
  const promises = [];

  for (let i = 1; i <= 1010; i++) {
      promises.push(await axios(`https://pokeapi.co/api/v2/pokemon/${i}`));
  }

  const responses = await Promise.all(promises);

  for (const response of responses) {
      const data = response.data;
      const newPoke = {
        nombre: data.name,
        id: data.id,
        imagen: data.sprites.other.dream_world.front_default,
        vida: data.stats[0]['base_stat'],
        ataque: data.stats[1]['base_stat'],
        defensa: data.stats[2]['base_stat'],
        velocidad: data.stats[5]['base_stat'],
        altura: data.height,
        peso: data.weight,
        origen: 'API',
        tipo: data.types[1]
        ?`${traductorDeTipo(data.types[0]['type']['name'])}, ${traductorDeTipo(data.types[1]['type']['name'])}`
        : traductorDeTipo(data.types[0]['type']['name']),
      } ;
      allPokesAPI.push(newPoke);
  }

  return allPokesAPI;
};

// const getPokesAPI = async (url) =>{ //url como parametro para traer la url de next o prev page
//     let allPokesAPI = [] //array para guardar los pokes traidos de la API
//     const page = (await axios(url)).data;
//     allPokesAPI.push(page.next, page.previous); //pusheamos para tener en los 2 primeros slots las url para nextPage y prevPage
//     const pokesObj = page.results //array de objetos que dentro tienen url de los pokes
//     const pokesResults = await Promise.all(pokesObj.map(async (poke) => { //con este promise.all resolvemos el conjunto de peticiones del .map
    
//         const pokeInfo = (await axios.get(poke.url)).data;
  
//         const newPoke = {
//             id: pokeInfo.id,
//             nombre: pokeInfo.name,
//             imagen: pokeInfo.sprites.other.dream_world.front_default,
//             tipo: pokeInfo.types[1]
//             ?`${traductorDeTipo(pokeInfo.types[0]['type']['name'])}, ${traductorDeTipo(pokeInfo.types[1]['type']['name'])}`
//             : traductorDeTipo(pokeInfo.types[0]['type']['name']),
//         };
  
//         return newPoke;
//       }));
  
//       allPokesAPI = [...allPokesAPI, ...pokesResults]
//       return allPokesAPI;
// }

const getPokes = async (url, nombre)=>{
    if(nombre && nombre !== 'next' && nombre !== 'prev') { //camino de nombre
        const flagPokesDB=false;
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
                ?`${traductorDeTipo(data.types[0]['type']['name'])}, ${traductorDeTipo(data.types[1]['type']['name'])}`
                : traductorDeTipo(data.types[0]['type']['name']),
            }
            matchPokes.push(poke)
            
        } catch (error) {
            console.error(`Error al obtener datos del Pokemon desde la API: ${error.message}`);
        }
        matchPokes.push(...pokesDB);
        
        return matchPokes
    } else { //camino sin nombre, juntamos los pokes DB y los pokes de la api
      
        const pokesDB = await getPokesDB();
        const pokesAPI = await getPokesAPI(url);
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
            ?`${traductorDeTipo(data.types[0]['type']['name'])}, ${traductorDeTipo(data.types[1]['type']['name'])}`
            : traductorDeTipo(data.types[0]['type']['name']),
        }
        return poke
    }
}

const postPoke = async (nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipo) => {
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
      for (const tip of tipo) {
        const findType = await Type.findOne({ where: { nombre: tip } });//buscamos los valores de tipo en la tabla Type
        if (findType) {
          await newPoke.addType(findType); //usamos el addType para establecer la relacion
        } else {
          throw new Error("No se encontro el tipo de pokemon");
        }
      }

      if(created) return `Se ha creado un nuevo Pokémon, ${newPoke.nombre}, y se le han asignado los tipos: ${tipo.join(', ')}.`
      else throw new Error(`El Pokémon ${newPoke.nombre} ya existe.`)
      
    } else {
      throw new Error("Algo salio mal y no se creo el pokemon");
    }
  } catch (error) {
    throw new Error(`Error en postPoke: ${error.message}`);
  }
};

const pokeDelete = async(id)=> {  //este por si hay q borrar algun poke creado
  await Pokemon.destroy({where: {id}})
}

module.exports = {
    getPokes, postPoke, getPokeById, pokeDelete
}


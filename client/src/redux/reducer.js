import { FILTER, GET_POKES, GET_POKES_ERROR, ORDER, PAGINATE} from "./actionTypes";

let initialState={
    allPokes:[],
    allPokesBackUp: [],
    currentPage: 0,
    allPokesFiltered:[],
}

const rootReducer=(state=initialState,action)=>{
    switch (action.type) {
        case GET_POKES:
            if (Array.isArray(action.payload)) {
                const sortedPokes = action.payload.sort((a, b) => a.id - b.id);
                return {
                  ...state,
                  allPokes: sortedPokes.splice(0, 12),
                  allPokesBackUp: sortedPokes,
                  allPokesFiltered: sortedPokes,
                };
              } else if (typeof action.payload === 'object') {
                return {
                  ...state,
                  allPokes: action.payload,
                };}
            break;
        case GET_POKES_ERROR:
            return{
                ...state,
                allPokesBackUp: action.payload
            }
            break;
        case PAGINATE:
            const nextPage = state.currentPage +1
            const prevPage = state.currentPage -1
            const firstIndex = action.payload === 'next'? nextPage * 12 : prevPage *12

            if(action.payload === 'next' && firstIndex >= state.allPokesFiltered.length) return {...state};
            else if(action.payload==='prev' && prevPage<0) return {...state}
            return {
                ...state,
                allPokes: [...state.allPokesFiltered].splice(firstIndex, 12),
                currentPage: action.payload ==='next'? nextPage : prevPage
            };
        case ORDER:
            if(action.payload==='Desc'){
                const pokesOrdered = [...state.allPokesFiltered].sort((prev, next)=>{
                    if(prev.ataque<next.ataque) return 1;
                    if(prev.ataque>next.ataque) return -1;
                    return 0
                })
                return {
                    ...state,
                    allPokes: [...pokesOrdered].splice(0,12),
                    allPokesFiltered: pokesOrdered,
                    currentPage:0,
                }
            } else if(action.payload==='Asc'){
                const pokesOrdered = [...state.allPokesFiltered].sort((prev, next)=>{
                    if(prev.ataque>next.ataque) return 1;
                    if(prev.ataque<next.ataque) return -1;
                    return 0
                })
                return {
                    ...state,
                    allPokes: [...pokesOrdered].splice(0,12),
                    allPokesFiltered: pokesOrdered,
                    currentPage:0,
                }
            } else if(action.payload==='A-Z'){
                const pokesOrdered = [...state.allPokesFiltered].sort((prev, next)=>{
                    if(prev.nombre>next.nombre) return 1;
                    if(prev.nombre<next.nombre) return -1;
                    return 0
                })
                return {
                    ...state,
                    allPokes: [...pokesOrdered].splice(0,12),
                    allPokesFiltered: pokesOrdered,
                    currentPage:0,
                }
            } else if(action.payload==='Z-A'){
                const pokesOrdered = [...state.allPokesFiltered].sort((prev, next)=>{
                    if(prev.nombre<next.nombre) return 1;
                    if(prev.nombre>next.nombre) return -1;
                    return 0
                })
                return {
                    ...state,
                    allPokes: [...pokesOrdered].splice(0,12),
                    allPokesFiltered: pokesOrdered,
                    currentPage:0,
                }
            }
        case FILTER:
            let pokesFiltered = [];
            if(action.payload !=='API' && action.payload !== 'DB'){
                pokesFiltered = [...state.allPokesBackUp].filter((poke)=>poke.tipo.includes(action.payload));
            } else pokesFiltered = [...state.allPokesBackUp].filter((poke)=>poke.origen === action.payload);
            return{
                ...state,
                allPokes: [...pokesFiltered].splice(0,12),
                allPokesFiltered: pokesFiltered,
                currentPage:0,
            }
        default: return state;
            break;
    }
}

export default rootReducer;
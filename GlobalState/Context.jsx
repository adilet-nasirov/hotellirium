import { createContext,useReducer } from "react";

const GlobalContext = createContext([]);
const initialState={
    data: [],
    liked: [],
    error: false,
    isDark: false
}
function reducer(state, action){
    switch(action.type){
        case 'set_data':
            return{
                ...state,
                data: action.payload
            }
        case 'add_liked':
            return{
                ...state,
                liked: state.liked.push(action.payload)
            }
        default:
            return state;
    }
}
const [state,dispatch]=useReducer(reducer,initialState)
export const GlobalProvider =({children})=>{
    <GlobalContext.Provider value={[state, dispatch]}>
        {children}
    </GlobalContext.Provider>
}
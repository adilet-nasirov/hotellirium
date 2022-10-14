import { createContext, useReducer } from "react";

export const DataContext = createContext();
 
const initialState = {
    data: [],
    liked:[],
    loading:false,
    error: false
}
const reducer = (state, action) => {
    switch(action.type){
        case 'fetch_start':
            return {
                ...state,
                loading: true
            }
        case 'fetch_success':
            return{
                ...state,
                loading: false,
                data: action.payload
            }
        default:
            return state;
    }
}

export function DataProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <DataContext.Provider value={[state,dispatch]}>
            {children}
        </DataContext.Provider>
    )
}
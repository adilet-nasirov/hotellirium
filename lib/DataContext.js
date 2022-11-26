import { createContext, useReducer } from "react";

export const DataContext = createContext();
 
const initialState = {
  data: [],
  liked: [],
  days: 1,
  guests: 1,
  loading: false,
  error: false,
  date_in: undefined,
  date_out: undefined,
};
const reducer = (state, action) => {
    switch(action.type){
        case 'fetch_start':
            return {
                ...state,
                loading: true
            }
        case 'fetch_success':
            return {
              ...state,
              loading: false,
              data: action.payload,
              days: action.days,
              guests: action.guests,
              date_in: action.date_in,
              date_out: action.date_out,
            };
        case 'change_guests':
            return{
                ...state,
                guests: action.guests
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
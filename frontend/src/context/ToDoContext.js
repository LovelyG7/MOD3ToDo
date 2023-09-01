import { createContext, useReducer } from "react"; 

export const TodosContext = createContext()

export const todosReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        todos: action.payload
      }
    case 'CREATE_TODO':
      return {
        todos: [action.payload, ...state.todos]
      }
    default:
      return state
  }
} 

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, {
    todos: null
  })

  //return template
  return (
    <TodosContext.Provider value={{...state, dispatch}}>
      { children }
    </TodosContext.Provider>
  )
}

//This page updates global state so that the page doesn't have to refresh in order to show the new list
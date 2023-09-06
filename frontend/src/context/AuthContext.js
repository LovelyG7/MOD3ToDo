import{ createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  //set up cases to track state.  login and logout
  switch (action.type) {
    case 'LOGIN':
      return {user: action.payload }
    case 'LOGOUT':
      return {user: null}
    default:
      return state
  }
}

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })
//fire function only once when component first renders to check for token in local storage initially
  useEffect(() => {
const user = JSON.parse(localStorage.getItem('user'))

if (user){
  dispatch({ type: 'LOGIN', payload: user })
}
},[])


  console.log('AuthContext state:', state)
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}
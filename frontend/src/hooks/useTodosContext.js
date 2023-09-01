import { useContext } from "react"
import { TodosContext } from "../context/ToDoContext";

export const useTodosContext = () => {
  const context = useContext(TodosContext)

  if (!context) {
    throw Error('useTodosContext must be used inside a TodosContextProvider')
  }

  return context
}


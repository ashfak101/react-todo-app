import { useContext } from "react"
import { DataContext } from "../context/ContextProvider"



const useData=()=>{
    const [todoList,setTodolist]=useContext(DataContext);
    return [todoList,setTodolist];
} 

export default useData;
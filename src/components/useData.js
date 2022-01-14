import { useContext } from "react"
import { DataContext } from "../context/ContextProvider"



const useData=()=>{
    const [datas,setDatas]=useContext(DataContext);
    return [datas,setDatas];
} 

export default useData;
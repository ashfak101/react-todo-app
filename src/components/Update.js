import TextField from '@mui/material/TextField';
import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import { useParams,useNavigate } from 'react-router-dom';
import useData from './useData';
export default function Update() {

     let navigate = useNavigate();
    let {id}=useParams()
    const [datas,setDatas]=useData({});
    const [updateData,setUpdate]= useState({})
    const [text,setText]=useState('');
    const [date,setDate]=useState('');
    console.log(datas);
    const handleOnChangeText=e=>{
        setText(e.target.value);
    }
    const handleOnChangeDate=e=>{
        setDate(e.target.value);
    }

   
     useEffect(() => {    
    const newData = datas.find((data)=> data.id==id)
        setUpdate(newData)
  }, [id])
    const handleOnSubmit= e =>{
        e.preventDefault();
        const singleTodo=[{
           ...updateData,
            name:text || updateData.name,
            Date: date || updateData.Date,
            
        }]
       
        
        const latestUpdate=datas.map(data=>singleTodo.find(todo=>todo.id===data.id)|| data)
       setDatas(latestUpdate)
    }


 
   
    return (
       <>
        <h1>{id}</h1>
        <form onSubmit={handleOnSubmit}>
          <TextField  placeholder={updateData?.name} 
          value={updateData?.name || " "}
         
          variant="outlined" onChange={handleOnChangeText} />
          <input className='date' type="Date" placeholder={updateData.Date}
            onChange={handleOnChangeDate}/>
                
                <Button
                 type='sumbit'
                  variant="contained"
                  sx={{p:1.5,ml:4}}
                  >Update</Button>
        </form>
       </>
    )
}

import TextField from '@mui/material/TextField';
import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import useData from './useData';
export default function Update() {
    let {id}=useParams()
    const [datas,setDatas]=useData();
    const [text,setText]=useState('');
    const [date,setDate]=useState('');
    console.log(datas);
    useEffect(()=>{
        const newData = datas.forEach(data=>
            data.id===id
        )
        setDatas(newData)
    },[])
    const handleOnChangeText=e=>{
        setText(e.target.value);
    }
    const handleOnChangeDate=e=>{
        setDate(e.target.value);
    }
    const handleOnSubmit=e=>{
        e.preventDefault();
        setDatas([{...datas,
            name:text
            ,Date:date,
            complete:false,
        }])
    }
    return (
       <>
        <h1>{id}</h1>
        <form onSubmit={handleOnSubmit}>
          <TextField id="outlined-basic" placeholder='Update task' 
          value={datas?.name}
          variant="outlined" onChange={handleOnChangeText} />
          <input className='date' type="Date"
           value={datas?.Date} onChange={handleOnChangeDate}/>
                
                <Button
                 type='sumbit'
                  variant="contained"
                  sx={{p:1.5,ml:4}}
                  >Update</Button>
        </form>
       </>
    )
}

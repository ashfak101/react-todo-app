import { TextField,Box } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import useData from './useData';

export default function TodoForm() {
    const [text,setText] =useState('')
    const [date,setDate] =useState('')

    const [datas,setDatas]=useData();
    console.log(datas);
    const handleChange=e=>{
        setText(e.target.value)
    }
    const handleDateChange=e=>{
        setDate(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        // storing data using spread oparator
        setDatas([...datas,{name:text,complete:false,Date:date}])
        
        setText('')
    }

    return (
        <Box  sx={{m:4}}>
            <form onSubmit={handleSubmit}>
                <TextField type="text" name='tasks'  id='tasks' placeholder='Add your task'
                onChange={handleChange}
                value={text}
                />
                <input className='date' type="Date" onChange={handleDateChange}/>
                
                <Button
                 type='sumbit'
                  variant="contained"
                  sx={{p:1.5,ml:4}}
                  >ADD+</Button>
            </form>
        </Box>
    )
}

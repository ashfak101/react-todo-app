import { TextField } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import useData from './useData';
export default function TodoForm() {
    const [text,setText] =useState('')

    const [datas,setDatas]=useData();

    const handleChange=e=>{
        setText(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setDatas([...datas,{name:text,complete:false}])
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField type="text" name='tasks' id='tasks' placeholder='Add your task'
                onChange={handleChange}
                />
                <Button
                 type='sumbit'
                  variant="contained"
                  sx={{m:1}}
                  >ADD+</Button>
            </form>
        </div>
    )
}

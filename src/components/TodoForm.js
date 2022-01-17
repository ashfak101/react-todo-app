import { TextField,Box } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import useData from './useData';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
export default function TodoForm() {
    const [text,setText] =useState('')
    const [date,setDate] =useState('')
    const [success, setSuccess] = useState(false)
    const [datas,setDatas]=useData();
    
    const handleChange=e=>{
        setText(e.target.value)
    }
    const handleDateChange=e=>{
        setDate(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        // storing data using spread oparator
        setDatas([...datas,{ 
        id: Math.random()*50,    
        name:text,
        complete:false,
        Date:date}])
        setSuccess(true)
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
           {success && <Alert severity="success">
                 <AlertTitle>Success</AlertTitle>    
             </Alert>}
        </Box>
    )
}

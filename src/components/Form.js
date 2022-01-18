import React from 'react'
import { TextField,Box } from '@mui/material'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
export default function Form({handleSubmit,handleChange,handleDateChange}) {
    return (
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
    )
}

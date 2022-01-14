import { TextField } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
export default function TodoForm() {
    const [text,setText] =useState('')
    return (
        <div>
            <form action="">
                <TextField type="text" name='tasks' id='tasks' placeholder='Add your task'/>
                <Button
                 type='sumbit'
                  variant="contained"
                  sx={{m:1}}
                  >ADD+</Button>
            </form>
        </div>
    )
}

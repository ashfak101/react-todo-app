import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import TodoForm from './TodoForm'

export default function Header() {
    return (
        <Box>
            <Typography variant='h4'
            sx={{fontSize:'35px',fontWeight:'700',color:'#999'}}
            >ToDo App</Typography>
            <Box sx={{
                m:4
            }}>
                <Link className='link' to={`/todoform`}>Add task</Link> 
                <Link  className='link' to={`/home`}>Task List</Link>
            </Box>
        </Box>
    )
}

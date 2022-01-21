import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from './Hooks/useAuth'


export default function Header() {

    const {user,logOut} =useAuth()
    return (
        <>
        
        <Box>
            <Typography variant='h4'
                sx={{ fontSize: '35px', fontWeight: '700', color: '#999' }}
            >ToDo App</Typography>
            <Box sx={{textAlign:'left',m:6,color:'red'}}>
            <Typography>User Name:  {user.displayName}</Typography>
        </Box>
            <Box sx={{
                m: 4
            }}>
                <Link className='link' to={`/home`}>Task List</Link>
                <Link className='link' to={`/todoform`}>Add task</Link>
               
            {   user.email ?
                <Button onClick={()=>logOut()}> log out</Button>:
                <Link className='link' to={`/login`}>Login</Link>
                }
                
            </Box>
        </Box>
        </>
    )
}

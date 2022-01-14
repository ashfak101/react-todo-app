import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Header() {
    return (
        <Box>
            <Typography variant='h4'
            sx={{fontSize:'35px',fontWeight:'700',color:'#999'}}
            >ToDo App</Typography>
        </Box>
    )
}

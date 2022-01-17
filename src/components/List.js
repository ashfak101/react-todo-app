import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
export default function List({data,id,checkComplete,index}) {
    return (
        <TableRow
      
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }
    }
      >
        <TableCell >
          <Typography>{index}</Typography>
        </TableCell>
        <TableCell component="th" scope="row" ><Typography id={id}>{data.name}</Typography></TableCell>
        <TableCell >
          <Typography align="right">{data.Date}</Typography>
        </TableCell>
        <TableCell align="right"><Button >Edit</Button></TableCell>
     <TableCell  align="right">   <Button >Delete</Button></TableCell>
        {
            data.complete ? <TableCell align="right" sx={{color:'green'}}>Completed</TableCell>: <TableCell align="right"><Button
            checked={data.complete}
            onClick={()=>checkComplete(id)} >Uncomplete</Button></TableCell> 

        }
        
       
        
      </TableRow>
    )
}

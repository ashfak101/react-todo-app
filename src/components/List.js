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
import useData from './useData';
import { Link } from 'react-router-dom';
export default function List({data,id,checkComplete,index,isClick}) {
    const [datas,setDatas]=useData()


    const deleteToDo =id=>{
      const newdata= datas.filter(data=> data.id!==id)
      setDatas(newdata)
    }
    

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
          <TableCell align="right">{
            data.complete===false ? <Link className='edit' to={`/update/${data.id}`}><Button  >Edit</Button></Link>:
            <Button disabled>Edit</Button>
          }</TableCell>
            {isClick && data.complete===true  ? <TableCell  align="right"> <Button
            sx={{color:'red'}}
             onClick={()=>deleteToDo(data.id)} >Delete</Button></TableCell> : <TableCell><Button disabled>Delete</Button></TableCell>}
        {
            data.complete ? <TableCell align="right" sx={{color:'green'}}>Completed</TableCell>: <TableCell align="right"><Button
            checked={data.complete}
            onClick={()=>checkComplete(id)} >Incomplete</Button></TableCell> 

        }
        
       
        
      </TableRow>
    )
}

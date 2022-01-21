import React from 'react'
import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';

import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import { Link } from 'react-router-dom';
export default function List({data,id,checkComplete,index,isClick,handleCheckBoxChange,deleteToDo}) {
  


    
   

    return (
        <TableRow 
      
        sx={{ '&:last-child td, &:last-child th': { border: 0} }
    }
      >
         <TableCell > <input type='checkbox'  value={data.id || ''} onChange={handleCheckBoxChange}/></TableCell>
        <TableCell >
       
          <Typography>{index}</Typography>
        </TableCell>
        <TableCell component="th" scope="row" ><Typography sx={{fontSize:'12px'}} id={id}>{data.name}</Typography></TableCell>
        <TableCell >
          <Typography align="right" sx={{fontSize:'12px'}}>{data.Date}</Typography>
        </TableCell>
          <TableCell align="right" >{
            data.complete===false ? <Link className='edit' to={`/update/${data.id}`}><Button sx={{fontSize:'12px'}} >Edit</Button></Link>:
            <Button disabled>Edit</Button>
          }</TableCell>
            {data.complete===true  ? <TableCell sx={{fontSize:'12px'}} align="right"> <Button
            sx={{color:'red'}}
             onClick={()=>deleteToDo(data.id)} >Delete</Button></TableCell> : <TableCell sx={{fontSize:'12px'}}><Button disabled>Delete</Button></TableCell>}
       
           { data?.complete ?  <TableCell sx={{fontSize:'12px'}} align="right"><Button
            
            onClick={()=>checkComplete(data.id)} >complete</Button></TableCell> :
            <TableCell sx={{fontSize:'12px'}} align="right"><Button
            
            onClick={()=>checkComplete(data.id)} >Incomplete</Button></TableCell>
            }


     
         <TableCell align="center" sx={{fontSize:'12px'}} >
         {data.remainingDays}
        </TableCell>
        
       
        
      </TableRow>
    )
}

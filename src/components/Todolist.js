import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import useData from './useData';
import List from './List';



export default function Todolist() {
    const [isClick,setIsClick]=useState(false)
   const [datas,setDatas]= useData();
   console.log(datas);

   const checkComplete=id=>{
        const newData=[...datas]
        newData.forEach((data,index)=>{
            if(index===id){
                data.complete = !data.complete
            } 
        })
        setDatas(newData);
   }
   
     

      
    return (
        <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell >Task</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">update</TableCell>
        <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((data,index) => (
              <List
              data={data}
              index={index}
              id={index}
              checkComplete={checkComplete}
              
              isClick={isClick}
              ></List>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

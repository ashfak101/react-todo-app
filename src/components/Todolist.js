import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PageviewIcon from '@mui/icons-material/Pageview';
import useData from './useData';
import List from './List';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';


export default function Todolist() {
    const [isClick,setIsClick]=useState(false)
   const [datas,setDatas]= useData();
    const [search,setSearch] =  useState('')
   console.log(datas);

   const checkComplete=id=>{
        const newData=[...datas]
        newData.forEach((data,index)=>{
            if(index===id){
                data.complete = !data.complete
            } 
        })
        setDatas(newData);
        setIsClick(true)
   }
   
    const handleSearchText=e=>{
      setSearch(e.target.value)
    }
    const handleSearch=()=>{
      const searchedTodo =datas.filter(data=>data.name.toLowerCase().includes(search.toLowerCase()))
      setDatas(searchedTodo)
    }

      
    return (
        <Box>
          <Box>
            <input className='search' type="text" onChange={handleSearchText}/>
            <Button variant='contained' sx={{m:1}} onClick={handleSearch}>Search</Button>
              
           
          </Box>
          <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell >Task</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">update</TableCell>
       {isClick&& <TableCell align="right">Delete</TableCell>}
            <TableCell align="right">Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((data,index)=>(
              <List
              key={data.id}
              data={data}
              index={index}
              id={index}
              checkComplete={checkComplete}
              
              isClick={isClick}></List>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    )
}

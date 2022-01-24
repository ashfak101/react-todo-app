import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../components/Hooks/useAuth'
export default function Login() {
        const [loginUser,setLoginUser]=useState()
        const  [toggle,setToggle]=useState(false)
        const {registerWithEmailPass,loginWithEmail,signInWithGoolge} = useAuth()
        const navigate=useNavigate()
        const toggleUser=e=>{
            setToggle(e.target.checked)
        }
        const handleOnBlur=e=>{
            const value=e.target.value;
            const field=e.target.name;
            const newData={...loginUser};
            newData[field]=value;
            setLoginUser(newData)
            console.log(loginUser);
        }
        const handleSubmit=e=>{
            e.preventDefault()
            
            if(!toggle){
                loginWithEmail(loginUser.email,loginUser.password)
                navigate(`/`)

            }
            else{
                registerWithEmailPass(loginUser.email,loginUser.password,loginUser.name,navigate)
               
               
                // window.location.reload()
            }
        }
        const handleGoogleLogin=()=>{
          
            signInWithGoolge()
            .then(res=>{
                // console.log(res.user)
                // setUser(res.user)
               
            })
            .catch(err=>console.log(err))
            navigate(`/`)
        }
        
  return <>
  
    <Box>
        {toggle ?
            <Typography sx={{
                fontSize:'16px',color:'blue',m:2
            }}>Please Register</Typography>:<Typography sx={{
                fontSize:'16px',color:'blue',m:2
            }}>Please Login</Typography>
        }

            <form onSubmit={handleSubmit}>
            {
                toggle && <TextField
                id="outlined-name"
                type='text'
                label="Name"
                name='name'
                 onChange={handleOnBlur}
             />
            }
            <TextField
                id="outlined-name"
                type='email'
                label="Email"
                name='email'
                 onChange={handleOnBlur}
             />
            <TextField
                id="outlined-name"
                type='password'
                label="Password"
                name='password'
                onChange={handleOnBlur}
             />
             <Button type='submit' >{toggle ? 'Register':'Login'}</Button>
            </form>

            <Box sx={{m:4}}>
                <input onChange={toggleUser} type='checkbox'/>
                <label >New User ?</label>
                <Button variant='outlined' sx={{ml:2}} onClick={handleGoogleLogin}>Google Login</Button>
            </Box>
    </Box>
  
  
  
  
  
  
  </>;
}

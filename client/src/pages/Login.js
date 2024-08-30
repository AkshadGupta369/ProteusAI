import React,{useState} from 'react';
import{Box,Typography,useTheme,useMediaQuery,TextField,Button,Alert,Collapse} from "@mui/material";
import {Link,useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";


const Login = () => {
  const theme=useTheme();
  const navigate=useNavigate();
  //media
  const isNotMobile=useMediaQuery("(min-width:1000px)");
  //states

const[email,SetEmail]=useState("");
const[password,SetPassword]=useState("");
const[error,SetError]=useState("");

//register ctrl
const handleSubmit=async(e)=>{
e.preventDefault();
try {
  await axios.post("/api/v1/auth/login",{email,password});

    localStorage.setItem("authToken",true);
    toast.success("Login Successfully");
    navigate('/ ');
  
}
 catch (err) {
  
  console.log(err);

  if(err.response.data.error){
    SetError(err.response.data.error);
  }
  else if(err.message){
    SetError(err.message);
  }
  setTimeout(()=>{
SetError("");
  },5000);
}

}

  return (
    <Box width={isNotMobile?"40%":"80%"} p={'2rem'} m={'8rem auto'} borderRadius={5} sx={{boxShadow:5}} backgroundColor={theme.palette.background.alt} >

      <Collapse in={!!error}>
      <Alert severity='error' sx={{mb:2}}>
        {error}
      </Alert>
      </Collapse>


      <form onSubmit={handleSubmit}> 
      <Typography variant='h3' textAlign={'center'}>Sign In</Typography>

   <TextField
    label="email" type='email' required margin='normal' fullWidth value={email} onChange={(e)=>{SetEmail(e.target.value)}}
    />

  <TextField
    label="password" type='password' required margin='normal' fullWidth value={password} onChange={(e)=>{SetPassword(e.target.value)}}
    />

<Button type='submit' fullWidth variant='contained' size='large' sx={{color:"white",mt:2}}>Sign In</Button>

<Typography p={'1rem'}>Don't have an account<Link to='/register'>Please Register</Link></Typography> 
      </form>
  
    </Box>
  )
}

export default Login

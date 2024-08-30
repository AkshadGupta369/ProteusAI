import React,{useState} from 'react';
import{Box,Typography,useTheme,useMediaQuery,TextField,Button,Alert,Collapse, Card} from "@mui/material";
import {Link,useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";


const Summary = () => {
  const theme=useTheme();
  const navigate=useNavigate();
  //media
  const isNotMobile=useMediaQuery("(min-width:1000px)");
  //states

const[text,Settext]=useState("");
const[summary,Setsummary]=useState("");
const[error,Seterror]=useState("");

//register ctrl
const handleSubmit=async(e)=>{
e.preventDefault();
try {
 let response= await axios.post("/api/v1/proteusai/summary",{text});  
 const {ans}=response.data;
//  console.log(JSON.stringify(ans));
//  Setsummary(JSON.stringify(ans,null,2));
   // Ensure ans is an object or array, and format it properly
   if (typeof ans === 'object') {
    Setsummary(JSON.stringify(ans, null, 2)); // Format the JSON
} else {
    Setsummary(ans); // If ans is already a string, use it directly
}
}
 catch (err) {
  
  console.log(err);

//   if(err.response.data.error){
//     Seterror(err.response.data.error);
//   }
//   else if(err.message){
//     Seterror(err.message);
//   }
//   setTimeout(()=>{
// Seterror("");
//   },5000);
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
      <Typography variant='h4' textAlign={'center'}>Summarize Text</Typography>

   <TextField
  placeholder='enter your text' type='text' required margin='normal' multiline={true} fullWidth value={text} onChange={(e)=>{Settext(e.target.value)}}
    />


<Button type='submit' fullWidth variant='contained' size='large' sx={{color:"white",mt:2}}>Summary</Button>

<Typography p={'1rem'}>Not this tool<Link to='/'>Go Back</Link></Typography> 
      </form>




      {summary ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Typography p={2}>{summary}</Typography>
        </Card>
      ) : (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="h5"
            color="natural.main"
            sx={{
              textAlign: "center",
              verticalAlign: "middel",
              lineHeight: "450px",
            }}
          >
            Summary Will Appear Here
          </Typography>
        </Card>
      )}
  
    </Box>
  )
}

export default Summary;

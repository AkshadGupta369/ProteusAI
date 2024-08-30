import React,{useState} from 'react';
import{Box,Typography,useTheme,useMediaQuery,TextField,Button,Alert,Collapse, Card, dividerClasses} from "@mui/material";
import {Link,useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import { light } from '@mui/material/styles/createPalette';


const Chatbot = () => {
  const[text1,Settext1]=useState("");
  const[text2,Settext2]=useState("");
  const theme=useTheme();
  const navigate=useNavigate();
  // media
  const isNotMobile=useMediaQuery("(min-width:1000px)");
  // states


const[summary,Setsummary]=useState("");
// const[error,Seterror]=useState("");

//register ctrl
const handleSubmit=async(e)=>{
e.preventDefault();
try {
 let response= await axios.post("/api/v1/proteusai/chatbot",{text1,text2});  

const {answer1,answer2}=response.data;

console.log(answer1);
console.log(answer2);
//  console.log(JSON.stringify(ans));
//  Setsummary(JSON.stringify(ans,null,2));
   // Ensure ans is an object or array, and format it properly
//    if (typeof ans === 'object') {
//     Setsummary(JSON.stringify(ans, null, 2)); // Format the JSON
// } else {
//     Setsummary(ans); // If ans is already a string, use it directly
// }
// if(answer2==null){
//   Setsummary(answer1);
// }
// else{
//   Setsummary(answer2);
// }
let summaryText = answer2 ? answer2 : answer1;
    
// Remove the stars from the summary text
summaryText = summaryText.replace(/\*/g, '');

Setsummary(summaryText);
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
    <div> 

<Box width={isNotMobile?"40%":"80%"} p={'2rem'} m={'8rem auto'} borderRadius={5} sx={{boxShadow:5}} backgroundColor={theme.palette.background.alt} >

{/* <Collapse in={!!error}>
<Alert severity='error' sx={{mb:2}}>
  {error}
</Alert>
</Collapse> */}


<form onSubmit={handleSubmit}> 
<Typography variant='h4' textAlign={'center'}>Interactive Chat Bot</Typography>

<TextField
  placeholder='enter your text' type='text' required margin='normal' multiline={true} fullWidth value={text1} onChange={(e)=>{Settext1(e.target.value)}}
    />

<p style={{ textAlign: 'center', fontWeight: '300' }}>Ask question in context to above</p>


    <TextField
  placeholder='enter your text' type='text' margin='normal' multiline={true} fullWidth value={text2} onChange={(e)=>{Settext2(e.target.value)}}
    />

<Button type='submit' fullWidth variant='contained' size='large' sx={{color:"white",mt:2}}>Summary</Button>

<Typography p={'1rem'}>Not this tool<Link to='/'>Go Back</Link></Typography> 
</form>




{summary ? (
  <Card
    sx={{
      mt: 3,
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
      mt: 3,
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
      Your chats will appear here!!!
    </Typography>
  </Card>
)}

</Box>

    </div>

  )
}

export default Chatbot;

import React from 'react'
import {Box,Typography,Card,Stack} from '@mui/material'
import {useNavigate} from 'react-router-dom';
import  DescriptionRounded from '@mui/icons-material/DescriptionRounded'
import  FormatAlignLeftOutlined from '@mui/icons-material/FormatAlignLeftOutlined'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Homepage = () => {
  const navigte=useNavigate();
  return (
    <>
   <Box sx={{display:'flex'}} flexDirection={'row'}>

  
    <Box p={2}>
   <Typography variant='h5' mb={2} fontWeight="bold">
    Text Generation Model
   </Typography>

   <Card onClick={()=>{navigte('/summary')}} sx={{boxShadow:2,borderRadius:5,height:190,width:300,'&hover':{border:2,boxShadow:0,borderColor:"primary.dark",cursor:'pointer'}}} >

 <DescriptionRounded sx={{fontSize:60,color:'primary.main',mt:2,ml:2}} />

 <Stack p={3} pt={0}>
<Typography fontWeight="bold" variant='h6'>Generates Text </Typography>

<Typography variant='h9'>
Answers to the prompt Passed by the user.
</Typography>

 </Stack>
   </Card>
    </Box>

    <Box p={2}>
   <Typography variant='h5' mb={2} fontWeight="bold">
   Interactive Model
   </Typography>

   <Card onClick={()=>{navigte('/chatbot')}} sx={{boxShadow:2,borderRadius:5,height:190,width:300,'&hover':{border:2,boxShadow:0,borderColor:"primary.dark",cursor:'pointer'}}} >

 <FormatAlignLeftOutlined sx={{fontSize:60,color:'primary.main',mt:2,ml:2}} />

 <Stack p={3} pt={0}>
<Typography fontWeight="bold" variant='h6'>Chat Bot </Typography>

<Typography variant='h9'>
Answers to the multiple questions asked by the user.
</Typography>
 
 </Stack>
   </Card>
    </Box>



    <Box p={2}>
   <Typography variant='h5' mb={2} fontWeight="bold">
Document Processing Model
   </Typography>

   <Card onClick={()=>{navigte('/file')}} sx={{boxShadow:2,borderRadius:5,height:190,width:300,'&hover':{border:2,boxShadow:0,borderColor:"primary.dark",cursor:'pointer'}}} >

 <PictureAsPdfIcon sx={{fontSize:60,color:'primary.main',mt:2,ml:2}} />

 <Stack p={3} pt={0}>
<Typography fontWeight="bold" variant='h6'>Summarizes Document </Typography>

<Typography variant='h9'>
Gives the crux of the document uploaded
</Typography>

 </Stack>
   </Card>
    </Box>
    
    </Box>
    </>
  )
} 

export default Homepage

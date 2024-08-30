import React,{useState} from 'react';
import{Box,Typography,useTheme,useMediaQuery,TextField,Button,Alert,Collapse, Card} from "@mui/material";
import {Form, Link,useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const FileProcess = () => {
  const theme=useTheme();
  const navigate=useNavigate();
  //media
  const isNotMobile=useMediaQuery("(min-width:1000px)");
  //states

// const[text,Settext]=useState("");
const[summary,Setsummary]=useState("");
const[error,setError]=useState("");
const [file, setFile] = useState(null);

//register ctrl
const handleSubmit=async(e)=>{
e.preventDefault();
if (!file) {
  setError("Please select a file.");
  return;
}


const formData=new FormData();
formData.append('file',file);
try {
 let response= await axios.post("/api/v1/proteusai/file",formData,{
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
// console.log(response.data.summary);
Setsummary(response.data.summary);
}
 catch (err) {
  console.log(err);
}
}
const handleFilechange=(event)=>{
  setFile(event.target.files[0]);
  }

  const buttonStyle = {
    mt: 3,
    backgroundColor: file ? 'green' : theme.palette.primary.main, // Set background color based on file upload
    color: 'white',
  };
  return (
    <Box width={isNotMobile?"40%":"80%"} p={'2rem'} m={'8rem auto'} borderRadius={5} sx={{boxShadow:5}} backgroundColor={theme.palette.background.alt} >

    <Collapse in={!!error}>
    <Alert severity='error' sx={{mb:2}}>
      {error}
    </Alert>
    </Collapse>


    <form onSubmit={handleSubmit}> 
    <Typography variant='h4' textAlign={'center'}>Summarize File</Typography>

    {/* <input  type='file' onChange={handleFilechange} width={'350px'} ></input> */}
    
    <Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
  onChange={handleFilechange}
  sx={buttonStyle}

  
>
  Upload file
  <VisuallyHiddenInput type="file" />
</Button>




<Button type='submit' fullWidth variant='contained' size='large' sx={{color:"white",mt:3}}>Summary</Button>

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
          Summary of file Will Appear Here
        </Typography>
      </Card>
    )}

  </Box>
  )
}

export default FileProcess;


{/* <form onSubmit={handleSubmit}>
  <input type='file' onChange={handleFilechange}></input>
  <button type='submit'>Press key</button>
</form> */}

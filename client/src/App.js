import './App.css';

import {Routes,Route} from "react-router-dom";
import {useMemo} from "react";
import { CssBaseline,ThemeProvider} from '@mui/material';
import {createTheme} from "@mui/material/styles";
import  { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import { themeSettings } from './theme';
import Summary from './pages/Summary';
import Chatbot from './pages/chatbot';
import FileProcess from './pages/FileProcess';


function App() {
  const theme=useMemo(()=>createTheme(themeSettings(),[])); 
  return (
    <>
    {/* <ThemeProvider theme={theme}> */}
    <Toaster/>

    <Navbar />
    <Toaster/>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/summary' element={<Summary/>} />
      <Route path='/chatbot' element={<Chatbot/>} />
      <Route path='/file' element={<FileProcess/>} />
    
    </Routes>
    {/* </ThemeProvider> */}
    </>
  );
}

export default App;

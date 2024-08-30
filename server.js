const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const bodyParser=require('body-parser');
const colors=require('colors');
const dotenv=require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const path=require("path");

//Routes
const authRoutes=require("./routes/authRoutes");


//dotenv
dotenv.config();

//Mongoose Connection
connectDB();
//rest object
const app=express();

const PORT=process.env.PORT;
//middlewares for our obtained modules
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(errorHandler);


app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*',function(req,res){
 res.sendFile(path.join(__dirname,'./client/build/index.html'))
});
//API ROUTES
app.use("/api/v1/auth",authRoutes); 
app.use("/api/v1/proteusai",require("./routes/ProteusaiRoutes"));

//listen server
 app.listen(PORT,()=>{
    console.log(`Server running on Port ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white);
 });

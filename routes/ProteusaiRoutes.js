const express=require('express');
const {summaryController,chatbotController,fileProcessController}=require("../controllers/ProteusaiController");
const multer = require('multer');
const path = require('path');

const router=express.Router();
const upload = multer({ dest: 'uploads/' });
//route
router.post("/summary",summaryController);
router.post("/chatbot",chatbotController);
router.post('/file',fileProcessController);



module.exports=router;


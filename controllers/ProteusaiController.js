const dotenv = require("dotenv");
dotenv.config();
const { IncomingForm } =require('formidable');

const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } =require("@google/generative-ai/server");


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.PROTEUS_API_SECRET);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const fileManager = new GoogleAIFileManager(process.env.PROTEUS_API_SECRET);



exports.summaryController = async (req, res) => {
    try {
      const { text } = req.body;
     const result=await model.generateContent(text);
     const response = result.response;
     const ans = response.text();
    res.status(200).json({ans});
// console.log(ans);

    } 
    catch (err) {
      console.log(err);
      return res.status(404).json({
        message: err.message,
      });
    }
  };



exports.chatbotController=async(req,res,next)=>{
  try {
const {text1,text2}=req.body;
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });

    let result1 = await chat.sendMessage(text1);
    let answer1 = result1.response.candidates[0].content.parts[0].text;

    let answer2;

    if (text2 && text2.trim() !== "") {
 
      let result2 = await chat.sendMessage(text2);
      answer2 = result2.response.candidates[0].content.parts[0].text;
    }

    // Send both results in a single response
    res.status(200).json({ answer1, answer2:answer2||null });

    
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
}

  exports.fileProcessController = async (req, res, next) => {
    const form = new IncomingForm();
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Error parsing the file" });
      }
  
      // Access the uploaded file
      const file = files.file[0]; // 'file' is the field name used in the form
  
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      // Move the file to a desired location (optional)
      const filePath = path.join(__dirname, '../uploads', file.originalFilename);
      fs.renameSync(file.filepath, filePath); // Move the file to the 'uploads' directory
  
      // Upload the file and specify a display name
      try {
        const uploadResponse = await fileManager.uploadFile(filePath, {
          mimeType: file.mimetype,
          displayName: file.originalFilename,
        });
  
        console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
  
        // Get the previously uploaded file's metadata
        const getResponse = await fileManager.getFile(uploadResponse.file.name);
        console.log(`Retrieved file ${getResponse.displayName} as ${getResponse.uri}`);
  
        // Generate content using text and the URI reference for the uploaded file
        const result = await model.generateContent([
          {
            fileData: {
              mimeType: uploadResponse.file.mimeType,
              fileUri: uploadResponse.file.uri,
            },
          },
          { text: "Can you summarize this document as a bulleted list?" },
        ]);
  
        // Output the generated text to the console and send it in the response
        // console.log(result.response.text());
        res.status(200).json({ summary: result.response.text() });
  
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while processing the file" });
      }
    });
  };

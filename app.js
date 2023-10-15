require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors=require("cors");
const {serve} = require('inngest/express')
const  {inngest}  =  require('./inngest/client');

const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));
const connectDB = require("./config/db");
const { scheduleEmail } = require("./controllers/cronController");
const { getProductLinkById } = require("./controllers/user");
const {schedule} = require('./inngest/Schedule')

const mongo_uri = `mongodb+srv://shahid:arthur#540913@cluster0.ggcnvuy.mongodb.net/Backlit`;

connectDB();
const port = process.env.PORT || 443;
console.log({ port });
// Routes
app.use("/", require("./routes/user"));
// Your API route configuration
app.use('/api/inngest', serve({ client: inngest, functions: [schedule],signingKey:process.env.SIGNING_KEY }));

// Endpoint for sending data to the 'schedule' function
app.post('/api/schedule', async (req, res) => {
  try {
    const { name, email, userOption, productLinks } = req.body;
    // Ensure that the required data is provided in the request body

    // Call the 'schedule' function with the provided data
    await inngest.send({
      name: "schedule/create", // This matches the event used in `createFunction`
      data: {
        name:name,
        email:email,
        userOption:userOption,
      },
    });

    return res.status(200).json({ success: true, message: 'Data scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling data:', error);
    return res.status(500).json({ success: false, message: 'Error scheduling data' });
  }
});

app.post('/schedule-email', async (req, res) => {
   const { name, email, productLinks,userOption } = req.body;
   const result = await scheduleEmail(name, email, productLinks,userOption);
   if (result.success) {
     return res.status(200).json({ message: result.message });
   } else {
     return res.status(500).json({ message: result.message });
   }
 });
 
 
app.listen(port);


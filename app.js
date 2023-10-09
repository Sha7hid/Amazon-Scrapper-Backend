require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
const connectDB = require("./config/db");
const { scheduleEmail } = require("./controllers/cronController");
const { getProductLinkById } = require("./controllers/user");

const mongo_uri = `mongodb+srv://shahid:arthur#540913@cluster0.ggcnvuy.mongodb.net/Backlit`;

connectDB();
const port = process.env.PORT || 443;
console.log({ port });
// Routes
app.use("/", require("./routes/user"));
app.post('/schedule-email', async (req, res) => {
   const { name, email, productLinks,userOption } = req.body;
   const result = await scheduleEmail(name, email, productLinks,userOption);
   if (result.success) {
     return res.status(200).json({ message: result.message });
   } else {
     return res.status(500).json({ message: result.message });
   }
 });
 // Backend API route to update the email schedule
app.put('/update-schedule/:userId', async (req, res) => {
   try {
     const { userId } = req.params;
     const { newScheduleOption } = req.body;
 
     // Validate the newScheduleOption
     if (!userOptionsToCron[newScheduleOption]) {
       return res.status(400).json({ message: 'Invalid schedule option' });
     }
 
     // Fetch the user's email from your database using userId
     const user = await User.findById(userId);
 
     if (!user) {
       return res.status(404).json({ message: 'User not found' });
     }
 
     const { email, name } = user; // Get user's email and name
 
     // Update the scheduled job with the new cron schedule
     const cronSchedule = userOptionsToCron[newScheduleOption];
     
     // Cancel the existing scheduled job
     if (scheduledJobs[email]) {
       scheduledJobs[email].destroy();
     }
 
     // Schedule a new job with the updated cron schedule
     scheduledJobs[email] = cron.schedule(cronSchedule, async () => {
       try {
         // Fetch the latest product links for the user
         const productLinks = await getProductLinkById(userId);
 
         // Send the email with the retrieved product links
         sendEmailToUser(name, email, productLinks);
         console.log(`Email scheduled with cron schedule: ${cronSchedule} for: ${email}`);
       } catch (error) {
         console.error('Error scheduling email:', error);
       }
     });
 
     return res.status(200).json({ success: true, message: 'Email schedule updated' });
   } catch (error) {
     console.error('Error updating email schedule:', error);
     return res.status(500).json({ success: false, message: 'Error updating email schedule' });
   }
 });
 
app.listen(port);


const cron = require('node-cron');
const { sendEmailToUser } = require('./sendEmailToUserController');

const userOptionsToCron = {
  '2 minutes': '*/2 * * * *',        // Every 2 minutes
  '1 week': '0 0 * * 0',            // Every Sunday (assuming Sunday is the start of the week)
  '15 days': '0 0 */15 * *',        // Every 15 days
  '1 month': '0 0 1 * *',           // First day of every month
  '3 months': '0 0 1 */3 *'         // First day of every 3 months
};
// Create an object to store scheduled jobs for each user
const scheduledJobs = {};
// googleId is name and name is email , email is empty
const scheduleEmail = async (name, email, productLinks,userOption) => {

  try {
  
    // Fetch the userOption from the database based on the user's email
    const response = await fetch(`http://localhost:443/api/user/schedule/${userOption}`); // Replace with your actual server URL
    const Option = await response.json();
    console.log(Option.schedule)

    // Check if the userOption is a valid option
    if (!userOptionsToCron[Option.schedule]) {
      console.log('Invalid user option; skipping this request.');
      return { success: false, message: 'Invalid user option' };
    }

    // Check if there is already a scheduled job for this user
    if (!scheduledJobs[userOption]) {
      // Get the cron schedule corresponding to the userOption
      const cronSchedule = userOptionsToCron[Option.schedule];
    
      // Schedule a job for the user with the selected cron schedule
      scheduledJobs[userOption] = cron.schedule(cronSchedule, async () => {
        try {
          const linksResponse = await fetch(`http://localhost:443/api/productlink/user/${userOption}`);
          const links = await linksResponse.json();
          console.log(links);
          await sendEmailToUser(name, email, productLinks);
          console.log(`Email scheduled with cron schedule: ${cronSchedule} for : ${email}`);
        } catch (error) {
          console.error('Error scheduling email:', error);
        }
      });
      console.log(`Email scheduled successfully with cron schedule: ${cronSchedule}`);
      return { success: true, message: 'Email scheduled successfully' };
    } else {
      // If an email is already scheduled for this user, cancel the existing schedule and create a new one
    
      // Get the cron schedule corresponding to the userOption
      const newCronSchedule = userOptionsToCron[Option.schedule];
    
      // Destroy the existing schedule
      scheduledJobs[userOption].stop();
    
      // Schedule a new job for the user with the updated cron schedule
      scheduledJobs[userOption] = cron.schedule(newCronSchedule, async () => {
        try {
          const linksResponse = await fetch(`http://localhost:443/api/productlink/user/${userOption}`);
          const links = await linksResponse.json();
          await sendEmailToUser(name, email, links);
          console.log(`Email rescheduled with new cron schedule: ${newCronSchedule} for : ${email}`);
        } catch (error) {
          console.error('Error rescheduling email:', error);
        }
      });
    
      console.log(`Email rescheduled successfully with new cron schedule: ${newCronSchedule}`);
      return { success: true, message: 'Email rescheduled successfully' };
    }    
  } catch (error) {
    console.error('Error scheduling email:', error);
    return { success: false, message: 'Error scheduling email' };
  }
}

module.exports = { scheduleEmail };
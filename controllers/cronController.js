const cron = require('node-cron');
const { sendEmailToUser } = require('./sendEmailToUserController');

// Create an object to map user options to cron expressions
const userOptionsToCron = {
  '2 minutes': '*/2 * * * *',        // Every 2 minutes
  '1 week': '0 0 * * 0',            // Every Sunday (assuming Sunday is the start of the week)
  '15 days': '0 0 */15 * *',        // Every 15 days
  '1 month': '0 0 1 * *',           // First day of every month
  '3 months': '0 0 1 */3 *'         // First day of every 3 months
};

// Create an object to store scheduled jobs for each user
const scheduledJobs = {};

const scheduleEmail = async (name, email, productLinks, userOption) => {
    console.log(userOption)
  try {
    // Check if the userOption is a valid option
    if (!userOptionsToCron[userOption]) {
      console.log('Invalid user option; skipping this request.');
      return { success: false, message: 'Invalid user option' };
    }

    // Check if there is already a scheduled job for this user
    if (!scheduledJobs[email]) {
      // Get the cron schedule corresponding to the userOption
      const cronSchedule = userOptionsToCron[userOption];

      // Schedule a job for the user with the selected cron schedule
      scheduledJobs[email] = cron.schedule(cronSchedule, async () => {
        try {
          await sendEmailToUser(name, email, productLinks);
          console.log(`Email scheduled with cron schedule: ${cronSchedule} for : ${email}`);
        } catch (error) {
          console.error('Error scheduling email:', error);
        }
      });
      console.log(`Email scheduled successfully with cron schedule: ${cronSchedule}`);
      return { success: true, message: 'Email scheduled successfully' };
    } else {
      console.log('Email is already scheduled for this user; skipping this request.');
      return { success: false, message: 'Email is already scheduled' };
    }
  } catch (error) {
    console.error('Error scheduling email:', error);
    return { success: false, message: 'Error scheduling email' };
  }
}

module.exports = { scheduleEmail };
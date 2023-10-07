const { sendEmailWithLinks } = require('./emailController');

const sendEmailToUser = async (name, email, productLinks) => {
  try {
    // Call the sendEmailWithLinks function to send the email
    await sendEmailWithLinks(name, email, productLinks);
    console.log(`Email sent to ${email}`);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Error sending email' };
  }
};


module.exports = { sendEmailToUser };

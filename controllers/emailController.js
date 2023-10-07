const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Configure your email service here
  service: 'Gmail',
  auth: {
    user: 'shahidshafadshahad@gmail.com',
    pass: 'bedamydpvbunxaee',
  },
});

const sendEmailWithLinks = async (name, email, productLinks) => {
  try {
    // Create email content with the product links
    console.log(productLinks)
    const emailContent = `
      Hello ${name},

      Here are your product links:
      ${productLinks
        .map(item => `${item.url}: ${item.url2}, ${item.url3}`)
        .join('\n')}
    `;

    const mailOptions = {
      from: 'shahidshafadshahad@gmail.com',
      to: email,
      subject: 'Product Links',
      text: emailContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmailWithLinks };

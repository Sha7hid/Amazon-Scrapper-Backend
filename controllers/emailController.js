const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Configure your email service here
  service: 'Gmail',
  auth: {
    user: 'shahidshafadshahad@gmail.com',
    pass: 'bedamydpvbunxaee',
  },
});

const sendEmailWithLinks = async (name, email,email2,email3, scrap) => {
  console.log(scrap)
  try {
    // Create email content with the product links

    const emailContent = `
      Hello ${name},

      Here are your scrapped review counts:
      ${scrap
        .map(item =>
          item.map((data)=>`${data.productName?.split(',')[0]}: ${data.reviewCount}, Rating:${data.rating} \n`) )
        .join('\n\n')}}
    `;

    const mailOptions = {
      from: 'shahidshafadshahad@gmail.com',
      to: [email,email2,email3],
      subject: 'Review Counts',
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

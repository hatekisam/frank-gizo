const nodemailer = require("nodemailer");
exports.contactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mamengisele@gmail.com",
        pass: process.env.MAIL_PASSWORD,
      },
    });

    

    const mailOptions = {
      from: `SHDR website ${email}`,
      to: "sustainablehomesdesign@gmail.com",
      subject: "Interested Client!",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        
        res.status(500).json({ success: false, error: "Email not sent" });
      } else {
        
        res.json({ success: true, message: "Email sent successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

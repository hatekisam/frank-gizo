"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.net",
        // port: 465,
        service: "gmail",
        auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "mugishayves189000@gmail.com",
                pass: "gfncjumwyenuyhkg",
        },
});
exports.sendPasswordMail = async (to, password) => {
        try {
                const mailOptions = {
                        from: 'service@shdr.com',
                        to: to,
                        subject: 'Password',
                        text: `Your Password to SHDR`,
                        html: `
				<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Password for SHDR</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      background-color: #ffffff;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      padding: 16px;
      width: 300px;
      text-align: center;
    }
    .heading {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
    }
    .code-container {
      background-color: #edf2f7;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 16px;
    }
    .code {
      font-size: 20px;
      font-family: monospace;
    }
    .copy-button {
      background-color: #3182ce;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .copy-button:hover {
      background-color: #2c5282;
    }
    .text {
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="heading">Your Password for Job App</h1>
    <p>Your password to log in to the Job App is:</p>
    <div class="code-container">
      <code class="code">${password}</code>
    </div>
    <button class="copy-button" id="copyButton">Copy Password</button>
    <p class="text">Please keep this password secure and do not share it with anyone.</p>
  </div>

  <script>
    const copyButton = document.getElementById('copyButton');
    copyButton.addEventListener('click', () => {
      const codeElement = document.querySelector('.code');
      const password = codeElement.textContent;

      const tempInput = document.createElement('input');
      tempInput.value = password;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      copyButton.textContent = 'Copied!';
    });
  </script>
</body>
</html>
`
                }

                await transporter.sendMail(mailOptions)
        } catch (error) {
                console.error('Error sending email: ', error)
                throw error
        }
}
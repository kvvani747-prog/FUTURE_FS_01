const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: message
    });

    console.log("EMAIL SENT SUCCESSFULLY");

    res.json({
      success: true,
      message: "Message sent successfully!"
    });

  } catch (error) {
    console.log("EMAIL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Email failed"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
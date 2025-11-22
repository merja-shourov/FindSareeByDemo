import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "himuas3@gmail.com", 
        pass: 'jaja wcbo rzbi owze', 
      },
    });

    await transporter.sendMail({
      from: email,
      to: "himuas3@gmail.com",
      subject: `New Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending message." });
  }
});

export default router;

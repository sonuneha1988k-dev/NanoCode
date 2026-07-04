const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// ✅ Serve files from the same folder where server.js is located
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/send-data", async (req, res) => {
  const { username, email } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sonuneha1988k@gmail.com",   // replace with your Gmail
        pass: "puin ghqg opxv tizv"       // Gmail App Password
      }
    });

    await transporter.sendMail({
      from: "your_email@gmail.com",
      to: "sonuneha1988k@gmail.com",
      subject: "Quiz Passed - User Details",
      text: `User ${username} (${email}) passed the Python Basics MCQ Quiz!`
    });

    res.send("✅ Email sent successfully!");
  } catch (err) {
    res.status(500).send("⚠️ Error sending email: " + err.message);
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

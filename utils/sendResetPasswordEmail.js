const sendEmail = require("./sendEmail");
const fs = require("fs");
const path = require("path");

const templatePath = path.join(__dirname, "templates", "reset-email.html");
const templateHtml = fs.readFileSync(templatePath, "utf8");

const sendResetPassswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;

  const html = templateHtml
    .replace(/{{RESET_URL}}/g, resetURL)
    .replace(/{{AÑO}}/g, new Date().getFullYear())
    .replace(/{{NAME}}/g, name);
  const message = html;

  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: message,
  });
};

module.exports = sendResetPassswordEmail;

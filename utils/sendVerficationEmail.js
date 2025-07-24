const sendEmail = require("./sendEmail");
const fs = require("fs");
const path = require("path");

const templatePath = path.join(__dirname, "templates", "verify-email.html");
const templateHtml = fs.readFileSync(templatePath, "utf8");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verificationUrl = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  const html = templateHtml
    .replace(/{{VERIFICATION_URL}}/g, verificationUrl)
    .replace(/{{AÑO}}/g, new Date().getFullYear())
    .replace(/{{NAME}}/g, name);
  const message = html;

  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: message,
  });
};

module.exports = sendVerificationEmail;

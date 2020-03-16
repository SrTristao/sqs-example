const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.userMail,
        pass: process.env.passMail
    }
});

exports.sendMail = async (to, html, subject = null, attachments = []) => {
    const params = {
        from: 'no-reply@gmail.com',
        to,
        subject,
        html,
        attachments
    }

    return await transport.sendMail(params);
}
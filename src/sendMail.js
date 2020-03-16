'use strict';
const mailService = require('./services/mail');
const fs = require('fs').promises;
const sqs = require('./services/sqs');

module.exports.handler = async event => {
    const {
        Records
    } = event;
    const {
        messageAttributes
    } = Records[0];
    const {
        type,
        mail
    } = sqs.decodeAttributes(messageAttributes);


    try {
        switch (type) {
            case 'welcome':
              const html = await fs.readFileSync(`${__dirname}/templates/welcome.html`, 'utf8');
              await mailService.sendMail(mail, html, 'Welcome to teste sqs');
              break;
            case 'forgot-user':
                const html = await fs.readFileSync(`${__dirname}/templates/forgot-user.html`, 'utf8');
                await mailService.sendMail(mail, html, 'Forgot User');
                break;
            case 'reset-password':
                const html = await fs.readFileSync(`${__dirname}/templates/reset-password.html`, 'utf8');
                await mailService.sendMail(mail, html, 'New password');
                break;
          }
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
};
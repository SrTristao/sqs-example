'use strict';
const sqs = require('./services/sqs');

module.exports.handler = async event => {
    const { mail, type } = JSON.parse(event.body);

    //Callback lambda
    let body = JSON.stringify({
        message: 'Sucesso !!'
    });
    let statusCode = 200;
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        await sqs.sendMessage(`Send mail to ${mail}`, { mail, type }, process.env.urlQueueSendMail);
    } catch (err) {
        console.error(err)
        body = JSON.stringify(err.message);
        statusCode = 400;
    }

    return {
        statusCode,
        headers,
        body
    }
};
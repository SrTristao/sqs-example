const AWS = require('aws-sdk');

AWS.config.update({
    credentials: new AWS.EnvironmentCredentials('AWS'),
    region: process.env.region
});

console.log(process.env.region)
const sqs = new AWS.SQS();

const encodeAttributes = attributesMessage => {
    for (var prop in attributesMessage) {
        attributesMessage[prop] = {
            "DataType": "String",
            "StringValue": attributesMessage[prop]
        }
    }

    return attributesMessage;
}

exports.sendMessage = async (message, attributesMessage, urlQueue) => {
    const params = {
        MessageBody: message,
        MessageAttributes: encodeAttributes(attributesMessage),
        QueueUrl: urlQueue,
        DelaySeconds: 60
    }

    return await sqs.sendMessage(params).promise();
}

exports.decodeAttributes = attributesMessage => {
    const obj = {};
    for (var prop in attributesMessage) {
        obj[prop] = attributesMessage[prop]['stringValue']
    }

    return obj;
}
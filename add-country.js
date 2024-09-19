const Responses = require('../common/API_Responses');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();


exports.add = async event => {
    console.log('event', event);
    const country = JSON.parse(event.body);
    if (country == null || !country.NAME || country.Code == null) {
        // failed without an NAME
        return Responses._400({ message: 'missing the NAME from the path' });
    }
    const params = {
        TableName: process.env.tableName,
        Item: {
            "NAME": country.name,
            "Code": country.code
        }
    };

    try {
        const newCountry = await documentClient.write(params).promise();
        return Responses._200({ message: newCountry });
    } catch (err) {
        console.log('Error in DynamoDB write', err);
        return Responses._500({ message: 'Failed to write country by NAME' });
    }

};
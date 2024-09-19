const Responses = require('../common/API_Responses');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.get = async event => {
    console.log('event', event);
    if (!event.pathParameters || !event.pathParameters.NAME) {
        // failed without an NAME
        return Responses._400({ message: 'missing the NAME from the path' });
    }

    const params = {
        TableName: process.env.tableName,
        Key: {
            NAME: event.pathParameters.NAME
        }
    };

    try {
        const country = await documentClient.get(params).promise();
        return Responses._200({ message: country });
    } catch (err) {
        console.log('Error in DynamoDB get', err);
        return Responses._500({ message: 'Failed to get country by NAME' });
    }
};
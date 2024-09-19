const Responses = require('../common/API_Responses')
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()



exports.delete = async event => {
    console.log('event', event)
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
        await documentClient.delete(params).promise();
        return Responses._200({ message: `Country with NAME: ${NAME} deleted successfully` });
    } catch (err) {
        console.log('Error in DynamoDB delete', err);
        return Responses._500({ message: 'Failed to delete country by NAME' });
    }
}
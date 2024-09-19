// const Responses = require('../common/API_Responses');
const AWS = require('aws-sdk');
const Dynamo = require('../common/Dynamo');
const documentClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.tableName;
const params = {
    TableName: tableName
}
async function listItems() {
    try {
        const data = await documentClient.scan(params).promise()
        return data
    } catch (err) {
        return err
    }
}
exports.list = async (event, context) => {
    try {
        const data = await listItems()
        return { body: JSON.stringify(data) }
    } catch (err) {
        return { error: err }
    }
}
const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const tableName = process.env.tableName;
exports.get = async event => {
    console.log('event', event);
    if (!event.pathParameters || !event.pathParameters.NAME) {
        // failed without an NAME
        return Responses._400({ message: 'missing the NAME from the path' });
    }
    let NAME = event.pathParameters.NAME;
    const user = await Dynamo.get(NAME, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });
    if (!user) {
        return Responses._400({ message: 'Failed to get user by NAME' });
    }
    return Responses._200({ user });
};
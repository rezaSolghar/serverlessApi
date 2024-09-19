const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const tableName = process.env.tableName;
exports.add = async event => {
    console.log('event', event);
    const user = JSON.parse(event.body);
    if (user == null || !user.NAME || user.Code == null) {
        // failed without an NAME
        return Responses._400({ message: 'missing the NAME from the path' });
    }
    const newUser = await Dynamo.write(user, tableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    });
    if (!newUser) {
        return Responses._400({ message: 'Failed to write user by NAME' });
    }
    return Responses._200({ newUser });
};
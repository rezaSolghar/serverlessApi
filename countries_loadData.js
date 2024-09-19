var AWS = require("aws-sdk");
var fs = require('fs');
const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const tableName = process.env.tableName;
// AWS.config.update({
//     region: "us-east-2",
// });
var documentClient = new AWS.DynamoDB.DocumentClient();
console.log("Importing countries into DynamoDB. Please wait...");
var allcountries = JSON.parse(fs.readFileSync('lambdas/common/countries.json', 'utf8'));
console.log(allcountries);
exports.fill = event => {
    allcountries.forEach(function (country) {
        var params = {
            TableName: tableName,
            Item: {
                "NAME": country.name,
                "Code": country.code
            }
        };
        documentClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add country", country.name, ". Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("PutItem succeeded:", country.name);
            }
        });
    });
};
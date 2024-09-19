var AWS = require("aws-sdk");
var fs = require('fs');
const tableName = process.env.tableName;
// AWS.config.update({
//     region: "us-east-2",
// });
var documentClient = new AWS.DynamoDB.DocumentClient();
console.log("Importing countries into DynamoDB. Please wait...");
var allcountries = JSON.parse(fs.readFileSync('common/countries.json', 'utf8'));
console.log(allcountries);


exports.fill = async (event) => {
    const batchSize = 25; // DynamoDB allows a maximum of 25 items per batch
    let batchPromises = [];

    // Process the countries in batches of 25
    for (let i = 0; i < allCountries.length; i += batchSize) {
        const batch = allCountries.slice(i, i + batchSize); // Get the current batch
        const putRequests = batch.map(country => ({
            PutRequest: {
                Item: {
                    "NAME": country.name,
                    "Code": country.code
                }
            }
        }));

        const params = {
            RequestItems: {
                [tableName]: putRequests
            }
        };

        // Push the batchWrite promise into an array
        batchPromises.push(documentClient.batchWrite(params).promise());
    }

    // Await all batch write operations
    try {
        await Promise.all(batchPromises);
        console.log("All countries added successfully.");
    } catch (err) {
        console.error("Error adding countries:", JSON.stringify(err, null, 2));
    }
};
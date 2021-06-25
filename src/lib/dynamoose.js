const dynamoose = require('dynamoose');

const ddb = new dynamoose.aws.sdk.DynamoDB({
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "region": process.env.app_aws_region
});

console.log(typeof ddb, ddb)

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

module.exports.ddbClient = ddb

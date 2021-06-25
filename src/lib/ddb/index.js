require('dotenv').config()

const { DynamoDB } 
    = require('@aws-sdk/client-dynamodb')

//const { fileToString } = require('./funcs')

const region            = process.env.app_aws_region

const ddbClient = new DynamoDB({
    region
});

//module.exports = ddbClient

module.exports.client = ddbClient

module.exports.listTables = async function listTables() {
    //try {
        const res = await ddbClient.listTables({})
        return res.TableNames
    //} catch(e) {
    //    console.log("DDB List Tables error: " + e)
    //    throw "DDB List Tables error: " + e
    //}
}

module.exports.createTable = async function createTable(tableName) {
    //try {{

        const tableInfo = {
            TableName: tableName,
            AttributeDefinitions: [{
                AttributeName: "Id", //ATTRIBUTE_NAME_1
                AttributeType: "N", //ATTRIBUTE_TYPE
            }],
            KeySchema: [{
                AttributeName: "Id", //ATTRIBUTE_NAME_1
                KeyType: "HASH",
            }],
            BillingMode: 'PAY_PER_REQUEST'
        }

        const res = await ddbClient.createTable(tableInfo)
        console.log(res)
        return res
    //} catch(e) {
    //    console.log("DDB List Tables error: " + e)
    //    throw "DDB List Tables error: " + e
    //}
}

module.exports.deleteTable = async function deleteTable(tableName) {
    try {
        const res = await ddbClient.deleteTable({
            TableName : tableName
        })
        console.log(res)
        return res
    } catch(e) {
        console.log("DDB Delete Table error: " + e)
        return false
        //throw "DDB List Tables error: " + e
    }
}

module.exports.put = async function put(tableName, item) {
    try {
        const res = await ddbClient.putItem({
            TableName : tableName,
            Item : item,
        })
        //console.log(res)
        if (res.$metadata.httpStatusCode === 200) return true;
        else throw 'DDB Put Item error, httpStatusCode == ' + res.$metadata.httpStatusCode
    } catch(e) {
        console.log("DDB Put Item error: " + e)
        throw "DDB Put Item error: " + e
    }
}

module.exports.get = async function get(tableName, id) {
    try {
        const res = await ddbClient.getItem({
            TableName : tableName,
            Key : {
                Id : id
            }
        })
        //console.log(res)
        if (res.$metadata.httpStatusCode === 200) return true;
        else throw 'DDB Get Item error, httpStatusCode == ' + res.$metadata.httpStatusCode
    } catch(e) {
        console.log("DDB Get Item error: " + e)
        throw "DDB Get Item error: " + e
    }
}

module.exports.del = async function del(tableName, id) {
    try {
        const res = await ddbClient.deleteItem({
            TableName : tableName,
            Key : {
                Id : id
            }
        })
        //console.log(res)
        if (res.$metadata.httpStatusCode === 200) return true;
        else throw 'DDB Delete Item error, httpStatusCode == ' + res.$metadata.httpStatusCode
    } catch(e) {
        console.log("DDB Delete Item error: " + e)
        throw "DDB Delete Item error: " + e
    }
}
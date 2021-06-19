require('dotenv').config()

const { S3Client, 
    HeadObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand } 
    = require('@aws-sdk/client-s3')

const { fileToString } = require('./funcs')

const bucketName        = process.env.app_s3_bucket_name
const region            = process.env.app_s3_bucket_region

const s3Client = new S3Client({
    region,
    //credentials: fromCognitoIdentityPool({
    //    client: new CognitoIdentityClient({ region: region }),
    //    identityPoolId: "IDENTITY_POOL_ID", // IDENTITY_POOL_ID
    //}),
})

module.exports.head = head = async function head(key) {

    try {
        const params = {
            Bucket: bucketName,
            Key: key,
        }
        try {
            const response = await s3Client.send(new HeadObjectCommand(params));
            return response
        } catch (e) {
            if ( e.$metadata !== undefined && e.$metadata.httpStatusCode == 404 ) {
                console.log("When getting file head: file not found");
                console.log(JSON.stringify(e))
            }
            else {
                console.log("Error getting file head: ", e);
                console.log(JSON.stringify(e))
            }
        }
    } catch (e) {
        console.log("Unkown error when trying to get file head: " + e);
    }

    // default
    return false
}

module.exports.exists = exists = async function exists(key) {
    let result = await head(key)
    return (result !== false)
}

module.exports.get = get = async function get(filename) {

    try {
        const params = {
            Bucket: bucketName,
            Key: filename,
        }
        try {
            const response = await s3Client.send(new GetObjectCommand(params));
            const file = {
                name : filename,
                contents: await fileToString(response.Body)
            }
            return file
        } catch (e) {
            if ( e.$metadata != undefined && e.$metadata.httpStatusCode == 404 ) {
                console.log("When retrieving file: file not found");
            }
            else {
                console.log("Error retrieving file: ", e);
                console.log(JSON.stringify(e))
            }
        }
    } catch (e) {
        console.log("Unkown error when trying to retrieve file: " + e);
    }

    // default
    return false
}

module.exports.put = put = async function put(key, contentType, contents) {
    
    //console.log("S3 file uploading is currently blocked")
    //return false

    try {
        const params = {
            Bucket: bucketName,
            Key: key,
            ContentType: contentType,
            Body: contents
        };

        try {
            const response = await s3Client.send(new PutObjectCommand(params));
            return true
        } catch (e) {
            console.log("Error uploading file: ", e);
        }
    } catch (e) {
        console.log("Unkown error when trying to upload file: " + e);
    }

    // default
    return false
}

module.exports.scratch = scratch = async function scratch(key) {

    try {
        const params = {
            Bucket: bucketName,
            Key: key,
        };
        try {
            const response = await s3Client.send(new DeleteObjectCommand(params));
            return true
        } catch (e) {
            console.log("Error deleting file: ", e);
        }
    } catch (e) {
        console.log("Unkown error when trying to delete file: " + e);
    }

    // default
    return false
}


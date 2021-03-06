'use strict';

const response = require('./lib/response')
const { exists: s3Exists, get: s3Get } = require('./lib/s3')
const { paramExists } = require('./lib/funcs')

//// find

module.exports.find = async (event) => {

    console.log("Find handler")

    if ( ! paramExists(event, 'name') )
        return response({
            result: "Error",
            errorCode: "missing filename input",
            message: 'Find: No file name specified',
            input: event,
        })

    let key = event.queryStringParameters.name

    let file = await s3Get(key)
    
    if ( ! file ) {
        return response({
            result: "Not Found",
            message: 'Find: File not found',
            input: event,
        })
    }

    return response({
        result: "Found",
        message: 'Find: File found',
        file: file,
        input: event,
    })
};

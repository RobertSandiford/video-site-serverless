'use strict';

const response = require('./lib/response')
const { exists: s3Exists, get: s3Get } = require('./lib/s3')
const { paramExists } = require('./lib/funcs')

//// find

module.exports.find = async (event) => {

    console.log("Find handler")

    if ( ! paramExists(event, 'name') )
        return response({
            message: 'Find: No file name specified',
            input: event,
        })

    let key = event.queryStringParameters.name

    let file = await s3Get(key)
    
    if ( ! file ) {
        return response({
            message: 'Find: File not found',
            input: event,
        })
    }

    return response({
        message: 'Find: File found',
        fileContents : file.contents,
        input: event,
    })
};

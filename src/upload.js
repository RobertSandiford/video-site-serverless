'use strict';

const response = require('./lib/response')
const { put: s3Put } = require('./lib/s3')
const { paramExists } = require('./lib/funcs')

//// upload

module.exports.upload = async (event) => {

    console.log("Upload handler")
   
    if ( ! paramExists(event, 'name') )
       return response({
           message: 'Upload: No file name specified',
           input: event,
       })

    if ( ! paramExists(event, 'contentType') )
        return response({
            message: 'Upload: No content-type specified',
            input: event,
        })

    if ( ! paramExists(event, 'contents') )
        return response({
            message: 'Upload: No contents specified',
            input: event,
        })

    let key = event.queryStringParameters.name
    let contentType = event.queryStringParameters.contentType
    let contents = event.queryStringParameters.contents

    if ( await s3Put(key, contentType, contents) ) {
        return response({
            message: `Upload: File '${key}' uploaded`,
            input: event,
        })
    }

    return response({
        message: `Upload: Error uploading file '${key}'`,
        input: event,
    })

};
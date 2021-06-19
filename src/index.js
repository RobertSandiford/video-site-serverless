'use strict';

const response = require('./lib/response')

//// index

module.exports.index = async (event) => {
    
    console.log("Index handler")

    return response({
        message: 'Index Handler',
        input: event,
    })
};

module.exports.paramExists = (event, param) => {
    return ( ! (
        event.queryStringParameters === undefined
        || event.queryStringParameters[param] === undefined
        || event.queryStringParameters[param] === ""
    ) )
}
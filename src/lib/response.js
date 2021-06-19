
module.exports = (data, code = 200) => ({
    statusCode: code,
    body: JSON.stringify(
        data,
        null,
        8
    ),
})

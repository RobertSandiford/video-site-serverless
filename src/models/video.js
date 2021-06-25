const dynamoose = require("dynamoose");

const name = "Video"

const schema = new dynamoose.Schema(
    {
        "id": Number,
        "name": String,
        "contents": String,
    }, 
    {
        //"saveUnknown": true,
        "timestamps": true
    }
);

const model = dynamoose.model(name, schema);

module.exports = model
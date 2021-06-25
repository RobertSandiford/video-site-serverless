
const { index } = require('../src/index')
const { find } = require('../src/find')
const { upload } = require('../src/upload')


//// This is badly in need of improvement


console.log('/ route')
indexResponse = index( {} )
console.log("Response:", indexResponse)


console.log('/find route')
findResponse = find( {} )
console.log("Response:", findResponse)


find( { queryStringParameters : { name : 'file1' } } )
.then( r => {
    console.log('/find?name=file1')
    console.log("Response:", r)
})
.catch( e => {
    console.log('/find?name=file1')
    console.log("Caught:", e)
})


console.log('/upload route')
uploadResponse = upload( {} )
console.log("Response:", uploadResponse)


upload({ 
    queryStringParameters : { 
        name : 'file1',
        contentType : "text/plain",
        contents : "abc 123"
    }
})
.then( r => {
    console.log('/upload?name=file1&content-type=text/plain&contents=abc 123')
    console.log("Response:", r)
})
.catch( e => {
    console.log('/upload?name=file1&content-type=text/plain&contents=abc 123')
    console.log("Caught:", e)
})
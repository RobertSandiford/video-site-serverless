const { index } = require('../../src/index')
const { find } = require('../../src/find')
const { upload } = require('../../src/upload')
const s3 = require ('../../src/lib/s3')

const { makeHttpEvent } = require('./httpEvent')
const { isValidJson } = require('../funcs')


describe('The /upload route', () => {
    
    const handler = upload
    const event = makeHttpEvent('POST', '/upload')
    const request = handler(event)

    test('returns a 200 code', async () => {
        const result = await request
        expect(result.statusCode).toBe(200)
    })

    test('returns a body which is valid json', async () => {
        const result = await request
        expect( isValidJson(result.body) ).toBe(true)
    })


    describe('When uploading a file', () => {

        test('a file is uploaded', async () => {

            const testFile = { 
                name : 'lambdaUploadTest',
                contentType : 'text/plain',
                contents : 'lambdaUploadTestContents',
            }
        
            const uploadEvent = makeHttpEvent('POST', '/upload', testFile)
            const uploadRequest = handler(uploadEvent)

            //await s3.del(testFile.name)

            // the file doesn't already exist
            const exists = await s3.exists(testFile.name)
            expect( exists ).toBe(false)

            const result = await uploadRequest
            
            // status code 200
            expect(result.statusCode).toBe(200)

            // response body JSON parses, and result OK
            const response = JSON.parse(result.body)
            if (response.result !== "OK") console.log("response", response)
            expect(response.result).toBe("OK")

            // the file now exists
            const file = await s3.get(testFile.name)
            expect( file ).not.toBe(false)

            // the file contents matches
            expect( file.contents ).toBe( testFile.contents )

            // cleanup
            const deleteResult = await s3.del(testFile.name)
            expect( deleteResult ).toBe(true)

            // verify cleanup
            const exists2 = await s3.exists(testFile.name)
            expect( exists2 ).toBe(false)

            console.log("response", response)

        })
         
    })

})


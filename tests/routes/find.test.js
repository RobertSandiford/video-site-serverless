const { index } = require('../../src/index')
const { find } = require('../../src/find')
const { upload } = require('../../src/upload')
const s3 = require ('../../src/lib/s3')

const { makeHttpEvent } = require('./httpEvent')
const { isValidJson } = require('../funcs')


describe('The /find route', () => {
    
    const handler = find
    const event = makeHttpEvent('GET', '/find')
    const request = handler(event)

    test('returns a 200 code and valid json', async () => {
        const result = await request
        expect(result.statusCode).toBe(200)
        expect( isValidJson(result.body) ).toBe(true)
    })

    const nonExistantFileRequest = handler(
        makeHttpEvent('GET', '/find', { name : "this-doesn't-exist" })
    )

    test('returns a Not Found result for a non-existing file', async () => {
        const result = await nonExistantFileRequest
        expect(result.statusCode).toBe(200)
        expect( isValidJson(result.body) ).toBe(true)
        const response = JSON.parse(result.body)
        if (response.result != "Not Found") console.log(response)
        expect( response.result ).toBe('Not Found')
    })




    test('returns a Found result for an existing file', async () => {

        const testFile = { 
            name : 'lambdaFindTest',
            contentType : 'text/plain',
            contents : 'lambdaFindTestContents',
        }

        // upload via s3 lib
        await s3.put(testFile.name, testFile.contentType, testFile.contents)

        const existantFileRequest = handler( 
            makeHttpEvent('GET', '/find', { name : testFile.name })
        )
        const result = await existantFileRequest

        // valid result
        expect(result.statusCode).toBe(200)
        expect( isValidJson(result.body) ).toBe(true)

        const response = JSON.parse(result.body)

        // "Found" result
        if (response.result != "Found") console.log(response)
        expect( response.result ).toBe('Found')

        // Check the file contents matches
        expect( response.file.contents ).toBe(testFile.contents)

        // cleanup
        expect( await s3.del(testFile.name) ).toBe(true)
        expect( await s3.exists(testFile.name )).toBe(false)
    })


})

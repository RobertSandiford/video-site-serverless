const { index } = require('../../src/index')
const { find } = require('../../src/find')
const { upload } = require('../../src/upload')
const s3 = require ('../../src/lib/s3')

const { makeHttpEvent } = require('./httpEvent')
const { isValidJson } = require('../funcs')

describe('The / index route', () => {

    const event = makeHttpEvent('GET', '/')
    const request = index(event)

    test('returns a 200 code', async () => {
        const result = await request
        expect(result.statusCode).toBe(200)
    })

    test('returns a body which is valid json', async () => {
        const result = await request
        expect( isValidJson(result.body) ).toBe(true)
    })

})

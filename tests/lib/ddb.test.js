const ddb = require('../../src/lib/ddb')

describe('list tables', () => {

    test('it returns an array of tables', async () => {
        const tables = await ddb.listTables()
        expect( Array.isArray(tables) ).toBe(true)
    })

})

/*
describe('create a table', () => {

    test('it creates a table', async () => {

        const tableName = 'test-table'

        //console.log( "delete 1 result", await ddb.deleteTable(tableName) )

        const res = await ddb.createTable(tableName)
        expect( res ).toBe('something it is not')

        console.log( "delete 2 result", await ddb.deleteTable(tableName) )
    })

})
*/

/*
describe('delete a table', () => {

    test('it deletes a table', async () => {
        const res = await ddb.deleteTable('test-table')
        expect( res.TableDescription.TableStatus ).toBe('DELETING')
    })

})
*/


describe('put an item', () => {

    test('it writes an item', async () => {
        const res = await ddb.put('test-table', {
            Id : { N: "1" }
        })
        console.log(res)
        expect( res ).toBe(true)
    })


})


describe('get an item', () => {

    test('it gets an item', async () => {
        const res = await ddb.get('test-table', { N: "1" })
        expect( res ).toBe(true)
    })

})

describe('delete an item', () => {

    test('it creates a table', async () => {
        const res = await ddb.del('test-table', { N: "1" })
        expect( res ).toBe(true)
    })

})


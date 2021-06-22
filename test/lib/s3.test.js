const s3 = require('../../src/lib/s3')


describe('file existance', () => {

    test('exists returns false when a file does not exist', async () => {
        const testFileName = 'nsvufhV$&GFC4BF'
        const exists = await s3.exists(testFileName)
        expect(exists).toBe(false)
    })

    //test('exists returns true when a file does exist', () => {
    //})

})


describe('file uploads', () => {

    test('files can be uploaded to s3, and deleted from s3', async () => {

        const testFileName = 'testFile'

        // check that the file doesn't already exist
        const exists = await s3.exists(testFileName)
        expect(exists).toBe(false)

        // upload the file
        const uploadResult = await s3.put(testFileName, 'text/plain', 'abc')
        expect(uploadResult).toBe(true)

        // test that the file now exists
        const exists2 = await s3.exists(testFileName)
        expect(exists2).toBe(true)

        // delete the file
        const deleteResult = await s3.del(testFileName)
        expect(deleteResult).toBe(true)

        // check that the file has been deleted
        const exists3 = await s3.exists(testFileName)
        expect(exists3).toBe(false)

    })

})


describe('file retrieval', () => {

    test('files can be retrieved from s3', async () => {

        const testFileName = 'testFile2'
        const testFileContents = 'abc1234'

        // upload the file
        const uploadResult = await s3.put(testFileName, 'text/plain', testFileContents)
        expect(uploadResult).toBe(true)

        // get the file and check it's contents
        const file = await s3.get(testFileName)
        expect(file.contents).toBe(testFileContents)

        // delete the file
        const deleteResult = await s3.del(testFileName)
        expect(deleteResult).toBe(true)

        // check that the file has been deleted
        const exists = await s3.exists(testFileName)
        expect(exists).toBe(false)

    })

})
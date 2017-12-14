import getFilePath from '../../../lib/utils/getFilePath'
import path from 'path'
import assert from 'assert'

describe('getFilePath', function () {
    before(function () {
        this.basePath = process.cwd()
        this.defaultFilename = 'selenium-standalone.txt'
    })

    it('should handle dir "./"', function () {
        const dir = './'
        const expectedPath = path.join(this.basePath, this.defaultFilename)
        const filePath = getFilePath(dir, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle dir "/', function () {
        const dir = '/'
        const expectedPath = path.join(dir, this.defaultFilename)
        const filePath = getFilePath(dir, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle dir "./log"', function () {
        const dir = './log'
        const expectedPath = path.join(this.basePath, dir, this.defaultFilename)
        const filePath = getFilePath(dir, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle dir "/log', function () {
        const dir = '/log'
        const expectedPath = path.join(dir, this.defaultFilename)
        const filePath = getFilePath(dir, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle dir "./log/"', function () {
        const dir = './log/'
        const expectedPath = path.join(this.basePath, dir, this.defaultFilename)
        const filePath = getFilePath(dir, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle dir "/log/', function () {
        const dir = '/log/'
        const expectedPath = path.join(dir, this.defaultFilename)
        const filePath = getFilePath(dir, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle dir "./log/selenium"', function () {
        const dir = './log/selenium'
        const expectedPath = path.join(this.basePath, dir, this.defaultFilename)
        const filePath = getFilePath(dir, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle dir "log"', function () {
        const dir = 'log'
        const expectedPath = path.join(this.basePath, dir, this.defaultFilename)
        const filePath = getFilePath(dir, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle dir "/log/selenium', function () {
        const dir = '/log/selenium'
        const expectedPath = path.join(dir, this.defaultFilename)
        const filePath = getFilePath(dir, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle file ".log"', function () {
        const file = '.log'
        const expectedPath = path.join(this.basePath, file)
        const filePath = getFilePath(file, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle file "./.log"', function () {
        const file = './.log'
        const expectedPath = path.join(this.basePath, file)
        const filePath = getFilePath(file, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle file "./log/.log"', function () {
        const file = './log/.log'
        const expectedPath = path.join(this.basePath, file)
        const filePath = getFilePath(file, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle file "./selenium-log.txt"', function () {
        const file = './selenium-log.txt'
        const expectedPath = path.join(this.basePath, file)
        const filePath = getFilePath(file, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle file "selenium-log.txt"', function () {
        const file = 'selenium-log.txt'
        const expectedPath = path.join(this.basePath, file)
        const filePath = getFilePath(file, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle file "/selenium-log.txt', function () {
        const file = '/selenium-log.txt'
        const expectedPath = file
        const filePath = getFilePath(file, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle file "./log/selenium-log.txt"', function () {
        const file = './log/selenium-log.txt'
        const expectedPath = path.join(this.basePath, file)
        const filePath = getFilePath(file, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle file "log/selenium-log.txt"', function () {
        const file = 'log/selenium-log.txt'
        const expectedPath = path.join(this.basePath, file)
        const filePath = getFilePath(file, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

    it('should handle file "/log/selenium-log.txt', function () {
        const file = '/log/selenium-log.txt'
        const expectedPath = file
        const filePath = getFilePath(file, this.defaultFilename)

        assert.strictEqual(filePath, expectedPath)
    })

})

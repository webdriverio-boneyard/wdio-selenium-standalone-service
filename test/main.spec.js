var assert = require('assert')
var fs = require('fs')

describe('webdriverio', function () {
    it('should run a test', function () {
        browser.url('/')
        assert.equal(browser.getTitle(), 'WebdriverIO - Selenium 2.0 javascript bindings for nodejs')
    })

    it('should have created a log file', function () {
        var file = fs.statSync(process.cwd() + '/selenium-standalone.txt')
        assert(file.size > 0)
    })
})

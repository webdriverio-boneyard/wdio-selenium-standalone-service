import assert from 'assert'

describe('webdriverio', function () {
    it('a spec', function () {
        browser.url('/')
        assert.equal(browser.getTitle(), 'WebdriverIO - Selenium 2.0 javascript bindings for nodejs')
    })
})

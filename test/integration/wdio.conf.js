exports.config = {
    specs: [
        './test/integration/*.spec.js'
    ],

    capabilities: [{
        browserName: 'firefox'
    }],

    sync: true,
    logLevel: 'verbose',
    coloredLogs: true,

    baseUrl: 'http://webdriver.io',

    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd'
    },

    services: [
        require('../../launcher')
    ],
    seleniumLogs: './',
    seleniumArgs: {
        version: '2.45.0'
    },
    seleniumInstallArgs: {
        version: '2.45.0'
    }
}

exports.config = {

    specs: [
        './test/*.spec.js'
    ],

    capabilities: [{
        browserName: 'firefox'
    }],

    sync: true,
    logLevel: 'silent',
    coloredLogs: true,

    baseUrl: 'http://webdriver.io',

    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        requires: [
            'babel-register'
        ]
    },

    services: [
        require('../')
    ]
}

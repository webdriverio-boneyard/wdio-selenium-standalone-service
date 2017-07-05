WDIO Selenium Standalone Service [![Code Climate](https://codeclimate.com/github/webdriverio/wdio-selenium-standalone-service/badges/gpa.svg)](https://codeclimate.com/github/webdriverio/wdio-selenium-standalone-service) [![Build Status](https://travis-ci.org/webdriverio/wdio-selenium-standalone-service.svg?branch=master)](https://travis-ci.org/webdriverio/wdio-selenium-standalone-service)
================================

Handling the Selenium server is out of scope of the actual WebdriverIO project. This service helps you to run Selenium seamlessly when running tests with the [WDIO testrunner](http://webdriver.io/guide/testrunner/gettingstarted.html). It uses the well know [selenium-standalone](https://www.npmjs.com/package/selenium-standalone) NPM package that automatically setups the standalone server and all required driver for you.

## Installation

The easiest way is to keep `wdio-selenium-standalone-service` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "wdio-selenium-standalone-service": "~0.1"
  }
}
```

You can simple do it by:

```bash
npm install wdio-selenium-standalone-service --save-dev
```

Instructions on how to install `WebdriverIO` can be found [here.](http://webdriver.io/guide/getstarted/install.html)

## Configuration

By default, Google Chrome, Firefox and PhantomJS are available when installed on the host system. In order to use the service you need to add `selenium-standalone` to your service array:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['selenium-standalone'],
  // ...
};
```

## Options

### seleniumLogs
Path where all logs from the Selenium server should be stored.

Type: `String`

### seleniumArgs
Map of arguments for the Selenium server, passed directly to `Selenium.start()`.

Type: `Object`

Default: `{}`

Example: 
```js
seleniumArgs: {
  seleniumArgs: ["-port", "4441"],
  javaArgs: [
    "-Xmx1024m"
  ]
},
```

### seleniumInstallArgs
Map of arguments for the Selenium server, passed directly to `Selenium.install()`.

Type: `Object`

Default: `{}`

----

For more information on WebdriverIO see the [homepage](http://webdriver.io).

import Selenium from 'selenium-standalone'
import util from 'util'
import fs from 'fs-extra'
import getFilePath from './utils/getFilePath'

const DEFAULT_LOG_FILENAME = 'selenium-standalone.txt'

class SeleniumStandaloneLauncher {
    constructor() {
        this.seleniumLogs = null
        this.seleniumArgs = {}
        this.seleniumInstallArgs = {}
        this.logToStdout = false
    }

    onPrepare(config) {
        this.seleniumArgs = config.seleniumArgs || {}
        this.seleniumInstallArgs = config.seleniumInstallArgs || {}
        this.seleniumLogs = config.seleniumLogs
        this.logToStdout = config.logToStdout
        this.skipSeleniumInstall = !!config.skipSeleniumInstall

        if (!this.skipSeleniumInstall) {
            return util.promisify(Selenium.install)(this.seleniumInstallArgs)
                .then(() => this._startSelenium(this.seleniumArgs))
        }

        return this._startSelenium(this.seleniumArgs)
    }

    onComplete() {
        if (this.process) {
            this.process.kill()
        }
    }

    _startSelenium(seleniumArgs) {
        return util.promisify(Selenium.start)(seleniumArgs).then((process) => {
            this.process = process

            if (typeof this.seleniumLogs === 'string') {
                this._redirectLogStream()
            }
        })
    }

    _redirectLogStream() {
        const logFile = getFilePath(this.seleniumLogs, DEFAULT_LOG_FILENAME)

        // ensure file & directory exists
        fs.ensureFileSync(logFile)

        const logStream = fs.createWriteStream(logFile, {flags: 'w'})
        this.process.stdout.pipe(logStream)
        this.process.stderr.pipe(logStream)
    }
}

export default SeleniumStandaloneLauncher

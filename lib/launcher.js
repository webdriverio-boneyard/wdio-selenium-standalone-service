import Selenium from 'selenium-standalone'
import path from 'path'
import fs from 'fs-extra'

const DEFAULT_LOG_FILENAME = 'selenium-standalone.txt'
const FILE_EXTENSION_REGEX = /\.[0-9a-z]+$/i

class SeleniumStandaloneLauncher {
    constructor () {
        this.seleniumLogs = null
        this.seleniumArgs = {}
        this.seleniumInstallArgs = {}
        this.logToStdout = false
    }

    onPrepare (config) {
        this.seleniumArgs = config.seleniumArgs || {}
        this.seleniumInstallArgs = config.seleniumInstallArgs || {}
        this.seleniumLogs = config.seleniumLogs
        this.logToStdout = config.logToStdout

        return this._installSeleniumDependencies(this.seleniumInstallArgs).then(() => new Promise((resolve, reject) => Selenium.start(this.seleniumArgs, (err, process) => {
            if (err) {
                return reject(err)
            }

            this.process = process
            if (typeof this.seleniumLogs === 'string') {
                this._redirectLogStream()
            }

            resolve()
        })))
    }

    onComplete () {
        if (this.process) {
            this.process.kill()
        }
    }

    _installSeleniumDependencies (seleniumInstallArgs) {
        return new Promise((resolve, reject) => Selenium.install(seleniumInstallArgs, (err) => {
            if (err) {
                return reject(err)
            }

            resolve()
        }))
    }

    _redirectLogStream () {
        let logFile = path.join(process.cwd(), this.seleniumLogs)

        // test if we already have a file (e.g. selenium.txt, .log, log.txt, etc.)
        // NOTE: path.extname doesn't work to detect a file, cause dotfiles are reported by node to have no extension
        if (!FILE_EXTENSION_REGEX.test(path.basename(logFile))) {
            logFile = path.join(logFile, DEFAULT_LOG_FILENAME)
        }

        // ensure file & directory exists
        fs.ensureFileSync(logFile)

        const logStream = fs.createWriteStream(logFile, { flags: 'w' })
        this.process.stdout.pipe(logStream)
        this.process.stderr.pipe(logStream)
    }
}

export default SeleniumStandaloneLauncher

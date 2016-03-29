import Selenium from 'selenium-standalone'
import mkdirp from 'mkdirp'
import path from 'path'
import fs from 'fs'

const DEFAULT_LOG_FILENAME = 'selenium-standalone.txt'

class SeleniumStandaloneLauncher {
    constructor () {
        this.seleniumLogs = null
        this.logToStdout = false
        this.opts = {}
    }

    onPrepare (config) {
        this.opts.seleniumArgs = config.seleniumArgs || []
        this.seleniumLogs = config.seleniumLogs
        this.logToStdout = config.logToStdout

        return new Promise((resolve, reject) => Selenium.start(this.opts, (err, process) => {
            if (err) {
                return reject(err)
            }

            this.process = process
            if (typeof this.seleniumLogs === 'string') {
                this._redirectLogStream()
            }

            resolve()
        }))
    }

    onComplete () {
        if (this.process) {
            this.process.kill()
        }
    }

    _redirectLogStream () {
        let logFile = path.join(process.cwd(), this.seleniumLogs)

        /**
         * create directory if not existing
         */
        try {
            fs.statSync(logFile)
        } catch (e) {
            mkdirp.sync(logFile)
        }

        if (logFile.slice(-1) === '/') {
            logFile += DEFAULT_LOG_FILENAME
        }

        const logStream = fs.createWriteStream(logFile, { flags: 'w' })
        this.process.stdout.pipe(logStream)
        this.process.stderr.pipe(logStream)
    }
}

export default SeleniumStandaloneLauncher

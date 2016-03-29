import Selenium from 'selenium-standalone'
import mkdirp from 'mkdirp'
import fs from 'fs'

class SeleniumStandaloneLauncher {
    constructor () {
        this.seleniumLogs = null
        this.opts = {}
    }

    onPrepare (config) {
        this.opts.seleniumArgs = config.seleniumArgs || []
        this.seleniumLogs = config.seleniumLogs

        return new Promise((resolve, reject) => Selenium.start(this.opts, (err, process) => {
            if (err) {
                return reject(err)
            }

            if (typeof this.seleniumLogs === 'string') {
                this._redirectLogStream()
            }

            this.process = process
        }))
    }

    onComplete () {
        if (this.process) {
            this.process.kill()
        }
    }

    _redirectLogStream () {
        /**
         * create directory if not existing
         */
        try {
            fs.statSync(this.seleniumLogs)
        } catch (e) {
            mkdirp.sync(this.seleniumLogs)
        }

        const logStream = fs.createWriteStream(this.seleniumLogs, { flags: 'a' })
        this.process.stdout.pipe(logStream)
        this.process.stderr.pipe(logStream)
    }
}

export default SeleniumStandaloneLauncher

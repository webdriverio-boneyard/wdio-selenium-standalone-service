import Selenium from 'selenium-standalone'
import denodeify from 'denodeify'

const startSelenium = denodeify(Selenium.start)

class SeleniumStandaloneLauncher {

    onPrepare () {
        return startSelenium().then((process) => {
            this.process = process
        })
    }

    onComplete () {
        this.process.kill()
    }
}

export default SeleniumStandaloneLauncher

import launcher from '../../../lib/launcher'
import path from 'path'
import assert from 'assert'

describe('getFilePath', function () {
	it('should add custom port to seleniumArgs', function() {
		const config = {
			port: 4441,
			seleniumArgs: {}, 
			seleniumLogs: './logs',
			services: ['selenium-standalone']
		}
		const launch = new launcher()
		launch._getConfig(config)

		const portIndex = launch.seleniumArgs.seleniumArgs.indexOf('-port')
		assert.ok(portIndex >= 0 && launch.seleniumArgs.seleniumArgs[portIndex + 1] === 4441)
	})

	it('should not override custom port already in seleniumArgs', function() {
		const config = {
			port: 4441,
			seleniumArgs: {
				seleniumArgs: ['-port', 4444]
			}, 
			seleniumLogs: './logs',
			services: ['selenium-standalone']
		}
		const launch = new launcher()
		launch._getConfig(config)

		const portIndex = launch.seleniumArgs.seleniumArgs.indexOf('-port')
		assert.ok(portIndex >= 0 && launch.seleniumArgs.seleniumArgs[portIndex + 1] === 4444)
	})
})

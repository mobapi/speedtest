const fetch = require('node-fetch')
const speedtest = require('speedtest-net')

const SPEEDTEST_SERVER_ID=process.env.SPEEDTEST_SERVER_ID
const SPEEDTEST_TIMEOUT_MS=process.env.SPEEDTEST_TIMEOUT_MS
const IFTTT_MAKER_EVENTNAME=process.env.IFTTT_MAKER_EVENTNAME
const IFTTT_MAKER_KEY=process.env.IFTTT_MAKER_KEY


const send = async (results) => {
	const data = {
		value1: Math.round(results.ping.latency),
		value2: (results.download.bandwidth * 8 / 1024 / 1024).toFixed(2).replace('.', ','),
		value3: (results.upload.bandwidth * 8 / 1024 / 1024).toFixed(2).replace('.', ','),
	}
	const opts = {
		method: 'post',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	}
	console.log('Sending data...')
	await fetch(`https://maker.ifttt.com/trigger/${IFTTT_MAKER_EVENTNAME}/with/key/${IFTTT_MAKER_KEY}`, opts)
	console.log('Sent data.')
}

const run  = async () => {
	try {
		const cancel = speedtest.makeCancel()
		setTimeout(cancel, SPEEDTEST_TIMEOUT_MS)
		let currentEventType = undefined
		const opts = {
			acceptLicense: true,
			acceptGdpr: true,
			cancel,
			progress: (evt) => {
				if(evt.type != currentEventType) {
					switch(evt.type) {
						case 'testStart':
							console.log("Starting tests...")
							break
						case 'ping':
							console.log("Ping test...")
							break
						case 'download':
							console.log("Download test...")
							break
						case 'upload':
							console.log("Upload test...")
							break
					}
				}
				currentEventType = evt.type
			},
			serverId: SPEEDTEST_SERVER_ID,
		}
		const results = await speedtest(opts)
		console.log(results)
		await send(results)
	}
	catch(e) {
		console.log(e.message)
	}
	finally {
		process.exit(0)
	}
}

(async () => await run())()

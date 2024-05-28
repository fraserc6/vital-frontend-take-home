/**
 * Data generation script
 *
 * As we want to filter marker results locally for this test and taking into
 * account the Vital API returns a paginated response with a cap of 100 results,
 * we want to generate the full range of available markers up front.
 *
 * Technically we could do this on demand, but would be a little overkill
 * and frankly pointless, as in a real life environment we'd either:
 * - Filter directly through the API
 * - Have an endpoint which provides an exhaustive set of markers
 *
 */

import * as dotenv from "dotenv"
const fs = require("fs")
const path = require("path")
import api from "@/services/api"
import { Marker } from "@/types/vital"

const STORAGE_PATH = "./data"

dotenv.config({
	path: "./.env.local",
})

/**
 * Grab the available markers from the API
 *
 * If the result is paginated, loop through and store all pages
 *
 * @returns
 */
async function generateMarkers() {
	let isEndOfResults = false
	let page = 1
	let results: Marker[] = []

	// Loop pages via API
	while (isEndOfResults == false) {
		// Perform API request
		const { data, error } = await api.getMarkers({ page })

		// Bail if we encounter an error
		if (error) {
			console.log(`Error fetching page ${page} of markers from the API.`)
			return
		}

		// Append results to the array
		results = results.concat(data.markers)

		// Update marker
		if (data.page == data.pages) {
			isEndOfResults = true
		} else {
			page++
		}

		console.log(`Stored page ${data.page} of ${data.pages} markers`)
	}

	// Write results to file
	writeData("Markers", "markers.json", JSON.stringify(results))
}

/**
 * Search and store all available labs from the API
 *
 * @returns
 */
async function generateLabs() {
	// Perform API request
	const { data, error } = await api.getLabs()

	// Bail if we encounter an error
	if (error) {
		console.log(`Error fetching labs from the API.`)
		return
	}

	// Store data
	writeData("Labs", "labs.json", JSON.stringify(data))
	console.log("Stored lab data")
}

/**
 * Saves data to a file
 */
function writeData(action: string, file: string, data: string) {
	// Check directory exists
	const filepath = `${STORAGE_PATH}/${file}`
	const dir = path.dirname(filepath)
	if (!fs.existsSync(dir)) {
		console.log(`Creating directory: `, dir)
		fs.mkdirSync(dir, { recursive: true })
	}

	// Store data locally
	fs.writeFile(filepath, JSON.stringify(data), function (err: string) {
		if (err) {
			return console.log(err)
		}
		console.log(`Stored ${action} to ${filepath}.`)
	})
}

generateMarkers()
generateLabs()

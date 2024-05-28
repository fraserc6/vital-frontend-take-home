/**
 * Fetch marker data
 *
 * This should be using our internal api.getMarkers()
 * method, however searching via the API is limited in that
 * the text and lab filtering isn't working too well.
 *
 * Instead, we're referencing some cached data and we'll
 * filter locally
 *
 * You can update the data store with `npm run generate-data`
 */

import MARKERS_DATA from "@/data/markers.json"
import { Marker } from "@/types/vital"

export async function GET(request: Request) {
	// Parse params
	const { searchParams } = new URL(request.url)
	const name = searchParams.get("name")
	const lab_id = searchParams.get("lab_id")

	// Grab data from local file
	let markers: Marker[] = JSON.parse(MARKERS_DATA)

	// Filter name
	if (name) {
		markers = markers.filter((marker) => {
			return (
				marker.name.toLowerCase().includes(name.toLowerCase()) ||
				marker.slug.toLowerCase().includes(name.toLowerCase())
			)
		})
	}

	// Filter lab
	if (lab_id) {
		markers = markers.filter((marker) => {
			return marker.lab_id == parseInt(lab_id)
		})
	}

	// Simulate error
	// return Response.json({ message: "Error fetching data" }, { status: 500 })

	// Simulate network latency
	await new Promise((r) => setTimeout(r, Math.random() * 750))

	return Response.json({ data: markers })
}

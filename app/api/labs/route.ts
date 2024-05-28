/**
 * Fetch lab data
 *
 * As we're fetching markers from a local cache,
 * I'm doing the same with labs for consistency.
 *
 * You can update the data store with `npm run generate-data`
 *
 */

import LAB_DATA from "@/data/labs.json"

export async function GET() {
	// Grab data from local storage
	const labs = JSON.parse(LAB_DATA)

	// Simulate network latency
	await new Promise((r) => setTimeout(r, Math.random() * 750))

	return Response.json({ data: labs })
}

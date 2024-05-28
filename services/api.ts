import { LabsResponse, MarkersResponse, RequestResponse } from "@/types/api"

/**
 * Base request handler
 *
 * This function extends the default fetch behaviour to
 * satisfy generic requests to the Vital API, including
 * appending the API key and other required headers.
 *
 * @param endpoint
 * @param init
 * @returns
 */
async function request(
	endpoint: string,
	init: RequestInit
): Promise<RequestResponse> {
	// Perform base request
	const response = await fetch(`${process.env.VITAL_BASE_URL}${endpoint}`, {
		...init,
		headers: {
			...init.headers,
			"Content-Type": "application/json",
			Accept: "application/json",
			"x-vital-api-key": process.env.VITAL_API_KEY || "",
		},
	})

	// Prepare return values dependent on success
	let data
	let error = false
	if (response.ok) {
		data = await response.json()
	} else {
		error = true
	}

	/**
	 * Return simplistic response
	 *
	 * We could expand this to include more data from
	 * the response.
	 */
	return {
		status: response.status,
		data,
		error,
	}
}

/**
 * GET helper function
 *
 * @param endpoint
 * @returns
 */
function get(endpoint: string) {
	return request(endpoint, { method: "GET" })
}

/**
 * Request the available biometric markers
 *
 * @returns
 */
async function getMarkers({
	page = 1,
	size = 50,
	name = "",
	lab_id = "",
}: {
	page?: number | string
	size?: number | string
	name?: string
	lab_id?: string | number
} = {}) {
	const response: MarkersResponse = await api.get(
		`/v3/lab_tests/markers?page=${page}&size=${size}&lab_id[]=${lab_id}&name=${name}`
	)
	return response
}

/**
 * Request the available labs
 *
 * @returns
 */
async function getLabs() {
	const response: LabsResponse = await api.get(`/v3/lab_tests/labs`)
	return response
}

/**
 * Define API interface
 */
const api = {
	get,
	getMarkers,
	getLabs,
}

export default api

import { Lab, Marker } from "./vital"

export interface RequestResponse {
	status: number
	data: any
	error: boolean
}

export interface MarkersResponse extends RequestResponse {
	data: {
		markers: Marker[]
		total: number
		page: number
		size: number
		pages: number
	}
}

export interface LabsResponse extends RequestResponse {
	data: Lab[]
}

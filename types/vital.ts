export type MarkerType = "biomarker" | "panel"

export interface Answer {
	id: number
	code: string
	value: string
}

export type QuestionType = "choice" | "text" | "numeric" | "multi_choice"

export interface Question {
	id: number
	required: boolean
	code: string
	value: string
	type: QuestionType
	sequence: number
	answers: Answer[]
}

export interface AoE {
	questions: Question[]
}

export interface Loinc {
	id: number
	name: string
	slug: string
	code: string
	unit?: string
}

export interface Result {
	id: number
	name: string
	slug: string
	lab_id?: number
	provider_id?: string
	required: boolean
	loinc?: Loinc
}

export interface Marker {
	id: number
	name: string
	slug: string
	description?: string
	lab_id?: number
	provider_id?: string
	type?: MarkerType
	unit?: string
	price?: string
	aoe?: AoE
	expected_results: Result[]
}

export type LabTestSampleType =
	| "dried_blood_spot"
	| "serum"
	| "saliva"
	| "urine"

export type LabTestCollectionMethod =
	| "testkit"
	| "walk_in_test"
	| "at_home_phlebotomy"

export interface Lab {
	id: number
	slug: string
	name: string
	first_line_address: string
	city: string
	zipcode: string
	collection_methods: LabTestCollectionMethod[]
	sample_types: LabTestSampleType[]
}

export interface Panel {
	id: number
	name: string
	collection_method: LabTestCollectionMethod
	biomarkers: Marker[]
}

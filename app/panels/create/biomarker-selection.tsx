/**
 * Biomarker selection step
 *
 * Fetches all available biomarkers from cached storage via
 * the local API.
 */

import useSWR from "swr"
import { useState } from "react"
import { Lab, Marker } from "@/types/vital"
import Button from "@/app/components/button"
import TextInput from "@/app/components/text-input"
import Select, { SelectOption } from "@/app/components/select"
import Label from "@/app/components/label"
import PageTitle from "@/app/components/page-title"
import Spinner from "@/app/components/spinner"

function BiomarkerList({
	markers,
	isLoading,
	error,
	selection,
	onChange,
}: {
	markers: Marker[]
	isLoading: boolean
	error: boolean
	selection: Marker[]
	onChange: (selection: Marker[]) => void
}) {
	// Render error
	if (error) {
		return (
			<p className="text-sm p-12 text-center text-zinc-500">
				Error loading markers
			</p>
		)
	}

	// Empty result set
	if (!markers.length) {
		// Render empty loading state
		if (isLoading) {
			return (
				<p className="text-sm p-12 text-center text-zinc-500">
					Loading markers
				</p>
			)
		}

		// Render no results
		return (
			<p className="text-sm p-12 text-center text-zinc-500">
				No markers found.
			</p>
		)
	}

	return (
		<>
			{/* Floating loading indicator */}
			<div
				className={`absolute top-3 right-6 pointer-events-none duration-150 ${
					isLoading ? "opacity-100" : "opacity-0"
				}`}
			>
				<Spinner />
			</div>

			{/* Result list */}
			<div className="grid sm:grid-cols-2 gap-1">
				{markers.map((marker) => {
					const matchedIndex = selection.findIndex((m) => m.id == marker.id)
					const isSelected = matchedIndex >= 0
					return (
						<div
							key={marker.id}
							className="flex gap-2 items-center hover:bg-zinc-100 duration-150 rounded-md py-2 px-2"
						>
							<input
								id={`marker-${marker.id}`}
								type="checkbox"
								className="rounded border-zinc-300"
								checked={isSelected}
								onChange={() => {
									let markers = [...selection]
									if (isSelected) {
										markers.splice(matchedIndex, 1)
									} else {
										markers.push(marker)
									}
									onChange(markers)
								}}
							/>
							<div className="grow">
								<Label htmlFor={`marker-${marker.id}`}>{marker.name}</Label>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default function BiomarkerSelection({
	defaultMarkers = [],
	onBack,
	onSave,
}: {
	defaultMarkers: Marker[]
	onBack: () => void
	onSave: (selection: Marker[]) => void
}) {
	// Local state
	const [markersNameFilter, setMarkersNameFilter] = useState("")
	const [markersLabFilter, setMarkersLabFilter] = useState("")
	const [selectedMarkers, setSelectedMarkers] =
		useState<Marker[]>(defaultMarkers)

	// Fetch markers from local API
	const {
		data: markersResponse,
		isLoading: isLoadingMarkers,
		error: markersError,
	} = useSWR<{
		data: Marker[]
	}>(`/api/markers?name=${markersNameFilter}&lab_id=${markersLabFilter}`, {
		keepPreviousData: true,
	})

	// Fetch markers from local API
	const {
		data: labsResponse,
		isLoading: isLoadingLabs,
		error: labsError,
	} = useSWR<{
		data: Lab[]
	}>("/api/labs")

	return (
		<form className="flex flex-col h-full">
			{/* Title section  */}
			<PageTitle title="Select biomarkers" backAction={onBack} />

			{/* Main form section */}
			<fieldset className="flex flex-col gap-6 p-6 pb-0 flex-1 overflow-hidden">
				{/* Marker filters */}
				<div className="flex gap-3">
					<div className="grow">
						<TextInput
							label="Search biomarkers"
							placeholder="Filter biomarkers by name or code"
							value={markersNameFilter}
							onChange={(e) => setMarkersNameFilter(e.target.value)}
						/>
					</div>
					<div className="w-40">
						<Select
							label="Lab"
							value={markersLabFilter}
							onChange={(e) => setMarkersLabFilter(e.target.value)}
						>
							<SelectOption value="" label="All labs" />
							{labsResponse?.data.map((lab) => (
								<SelectOption
									key={lab.id}
									value={lab.id.toString()}
									label={lab.name}
								/>
							))}
						</Select>
					</div>
				</div>

				{/* Marker results */}
				<div className="relative border rounded-xl bg-zinc-50/50 overflow-hidden flex-1">
					<div className="overflow-y-auto h-full p-4">
						<BiomarkerList
							markers={markersResponse?.data || []}
							isLoading={isLoadingMarkers || isLoadingLabs}
							error={markersError || labsError}
							selection={selectedMarkers}
							onChange={setSelectedMarkers}
						/>
					</div>
				</div>
			</fieldset>

			{/* Bottom actions */}
			<div className="flex flex-col sm:flex-row gap-3 sm:gap-6 p-6">
				{/* Selected marker actions */}
				<div className="sm:grow">
					{selectedMarkers.length > 0 && (
						<div className="text-sm gap-3 text-zinc-500 flex justify-between py-2">
							<div>
								<p>{selectedMarkers.length} selected</p>
							</div>
							<div>
								<button
									type="button"
									className="underline"
									onClick={() => setSelectedMarkers([])}
								>
									Clear selection
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Form actions */}
				<div className="flex flex-col sm:flex-row sm:justify-end gap-3">
					<div>
						<Button width="full" onClick={onBack} color="gray">
							Cancel
						</Button>
					</div>
					<div>
						<Button width="full" onClick={() => onSave(selectedMarkers)}>
							Save markers
						</Button>
					</div>
				</div>
			</div>
		</form>
	)
}

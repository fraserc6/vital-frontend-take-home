/**
 * Individual panel page
 *
 * Renders an overview for a given panel ID via the url
 */

"use client"

import { useEffect, useState } from "react"
import { Marker, Panel } from "@/types/vital"
import Label from "@/app/components/label"
import Badge from "@/app/components/badge"
import PageTitle from "@/app/components/page-title"
import Button from "@/app/components/button"

export default function PanelPreview({
	params: { id },
}: {
	params: { id: string }
}) {
	// Local state
	const [isReady, setIsReady] = useState(false)
	const [panel, setPanel] = useState<Panel | null>(null)

	/**
	 * Load panels from storage
	 *
	 * We want to update this when the searchParams change to correctly
	 * update the list.
	 *
	 * Outside of this test we would be pulling this from the API and
	 * can fire off a mutation trigger instead of this useEffect
	 */
	useEffect(() => {
		const localPanelsRaw = localStorage.getItem("vital_panels")
		if (localPanelsRaw) {
			const matchedPanel = (JSON.parse(localPanelsRaw) as Panel[]).find(
				(_panel) => _panel.id.toString() == id
			)
			if (matchedPanel) {
				setPanel(matchedPanel)
			}
		}
		setIsReady(true)
	}, [id])

	// Render loading
	if (!isReady) {
		return (
			<div className="flex flex-col gap-2 p-6">
				<div className="w-full h-10 bg-zinc-50 rounded-md" />
				<div className="w-full h-10 bg-zinc-50 rounded-md" />
				<div className="w-full h-10 bg-zinc-50 rounded-md" />
			</div>
		)
	}

	// Handle missing panel
	if (!panel) {
		return (
			<div>
				<PageTitle title="Panel not found" backHref="/" />
				<div className="p-6">
					<p className="text-zinc-500">
						The panel you are looking for cannot be found.
					</p>
					<div className="mt-4">
						<Button color="gray" href="/">
							Back to home
						</Button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col h-full">
			{/* Title section */}
			<PageTitle title={panel.name} backHref="/" />

			{/* Main section */}
			<div className="space-y-6 p-6">
				<div className="grid grid-cols-3 gap-6">
					<div>
						<div className="mb-2.5">
							<Label>Name</Label>
						</div>
						<span className="text-zinc-500 text-sm">{panel.name}</span>
					</div>
					<div>
						<div className="mb-2.5">
							<Label>Collection method</Label>
						</div>
						<span className="text-zinc-500 text-sm">
							{panel.collection_method}
						</span>
					</div>
				</div>
				<div>
					<div className="mb-2.5">
						<Label>Biomarkers</Label>
					</div>
					{panel.biomarkers.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-4">
							{panel.biomarkers.map((marker: Marker) => (
								<Badge key={marker.id} label={marker.name} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

/**
 * Create panel page
 *
 * Renders a form to create a panel
 */

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FieldValues, useForm } from "react-hook-form"
import { PlusIcon } from "@heroicons/react/16/solid"
import { Marker } from "@/types/vital"
import Button from "@/app/components/button"
import TextInput from "@/app/components/text-input"
import Select, { SelectOption } from "@/app/components/select"
import Label from "@/app/components/label"
import PageTitle from "@/app/components/page-title"
import Badge from "@/app/components/badge"
import BiomarkerSelection from "./biomarker-selection"

export default function CreatePanelPage() {
	// Local state
	const [showBiomarkerSelection, setShowBiomarkerSelection] = useState(false)

	/**
	 * Setup form state
	 *
	 * This initiates the intended form structure with validation controls
	 */
	const {
		control,
		handleSubmit,
		watch,
		setValue,
		trigger,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(
			z.object({
				name: z.string().min(1, "Enter the panel name"),
				collection_method: z.string().min(1, "Select a collection method"),
				biomarkers: z.any().array().min(1, "Select at least one marker"),
			})
		),
		defaultValues: {
			name: "",
			collection_method: "Test kit",
			biomarkers: [],
		},
	})

	// Watch markers
	const selectedMarkers = watch("biomarkers")

	// Access router
	const router = useRouter()

	/**
	 * Handle form submission
	 */
	function onSave(data: FieldValues) {
		// Check if we need to update an existing list or create new
		const payload = {
			...data,
			id: Math.floor(Math.random() * 1000),
		}
		let panels
		const localPanelsRaw = localStorage.getItem("vital_panels")
		if (localPanelsRaw) {
			panels = JSON.parse(localPanelsRaw)
			panels.push(payload)
		} else {
			panels = [payload]
		}

		// Store data
		localStorage.setItem("vital_panels", JSON.stringify(panels))

		// Go back to list
		toast("Your panel has been saved")
		router.push("/")
	}

	/**
	 * Render biomarker selection
	 */
	if (showBiomarkerSelection) {
		return (
			<BiomarkerSelection
				defaultMarkers={selectedMarkers}
				onBack={() => setShowBiomarkerSelection(false)}
				onSave={(selection) => {
					setValue("biomarkers", selection as any)
					trigger("biomarkers")
					setShowBiomarkerSelection(false)
				}}
			/>
		)
	}

	return (
		<form className="flex flex-col h-full" onSubmit={handleSubmit(onSave)}>
			{/* Title section */}
			<PageTitle title="Create panel" backHref="/" />

			{/* Main form section */}
			<fieldset className="grow p-6 space-y-6 overflow-y-auto">
				<div className="max-w-md">
					<Controller
						control={control}
						name="name"
						render={({ field }) => (
							<TextInput
								label="Panel name"
								placeholder="My First Panel"
								error={errors.name?.message}
								{...field}
							/>
						)}
					/>
				</div>
				<div className="max-w-md">
					<Controller
						control={control}
						name="collection_method"
						render={({ field }) => (
							<Select label="Collection method" {...field}>
								<SelectOption value="Test kit" label="Test kit" />
								<SelectOption
									value="At-home phlebotomy"
									label="At-home phlebotomy"
								/>
								<SelectOption
									value="Walk-in phlebotomy"
									label="Walk-in phlebotomy"
								/>
							</Select>
						)}
					/>
				</div>
				<div>
					<div className="mb-2.5">
						<Label>Biomarkers</Label>
					</div>
					{selectedMarkers.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-4">
							{selectedMarkers.map((marker: Marker) => (
								<Badge key={marker.id} label={marker.name} />
							))}
						</div>
					)}
					<div>
						<Button
							size="sm"
							color="white"
							onClick={() => setShowBiomarkerSelection(true)}
						>
							<PlusIcon className="size-4" />
							{selectedMarkers.length > 0 ? "Edit" : "Add"} biomarkers
						</Button>
					</div>
					{errors.biomarkers?.message && (
						<p className="text-red-600 text-sm font-medium mt-2">
							{errors.biomarkers?.message}
						</p>
					)}
				</div>
			</fieldset>

			{/* Form actions */}
			<div className="flex justify-end gap-3 p-6 border-t border-zinc-100">
				<div>
					<Button
						width="full"
						color="gray"
						onClick={() => {
							if (
								confirm(
									"Are you sure you wish to cancel? Your panel will not be saved."
								)
							) {
								router.push(`/`)
							}
						}}
					>
						Cancel
					</Button>
				</div>
				<div>
					<Button width="full" type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Saving..." : "Save"}
					</Button>
				</div>
			</div>
		</form>
	)
}

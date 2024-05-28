/**
 * Panel list page
 *
 * Handles the empty and loading state while fetching
 */

"use client"

import { Panel } from "@/types/vital"
import { ArrowUpRightIcon } from "@heroicons/react/16/solid"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Button from "@/app/components/button"
import PageTitle from "./components/page-title"

export default function PanelsPage() {
	// Access router
	const router = useRouter()

	// Local state
	const [panels, setPanels] = useState<Panel[]>([])
	const [isReady, setIsReady] = useState(false)

	/**
	 * Load panels from storage
	 *
	 * Usually we would be pulling this from the API via SSR fetch or SWR
	 */
	useEffect(() => {
		const localPanelsRaw = localStorage.getItem("vital_panels")
		if (localPanelsRaw) {
			setPanels(JSON.parse(localPanelsRaw))
		}
		setIsReady(true)
	}, [])

	// Render skeleton loading
	if (!isReady) {
		return (
			<div className="flex flex-col gap-2 p-6">
				<div className="w-full h-10 bg-zinc-50 rounded-md" />
				<div className="w-full h-10 bg-zinc-50 rounded-md" />
				<div className="w-full h-10 bg-zinc-50 rounded-md" />
			</div>
		)
	}

	// Render empty state
	if (!panels.length) {
		return (
			<div className="h-full flex justify-center items-center">
				<div className="p-10 max-w-lg">
					<div className="text-center mt-3">
						<h2 className="tracking-tight text-lg">Create your first panel</h2>
						<p className="text-base text-zinc-500 mt-1.5">
							A panel allows you to define a custom set of biomarkers and a
							collection method to be used on your test kits.
						</p>
					</div>
					<div className="mt-6 flex justify-center">
						<Button href="panels/create">Create panel</Button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col h-full">
			{/* Title section */}
			<PageTitle title="Your panels" />

			{/* Main section */}
			<div className="grow">
				<div className="flex flex-col divide-y divide-zinc-100 p-2">
					{panels.map((panel) => (
						<div key={panel.id}>
							<button
								type="button"
								onClick={() => router.push(`/panels/${panel.id}`)}
								className={`rounded-md px-4 py-4 text-left w-full duration-150 hover:bg-zinc-50`}
							>
								<div className="flex flex-col lg:flex-row gap-2 lg:gap-6 lg:items-center">
									<div className="w-1/3">
										<span className="font-medium text-sm">{panel.name}</span>
									</div>
									<div className="flex grow gap-6 text-zinc-500 text-sm">
										<div className="flex-1">
											<span>{panel.collection_method}</span>
										</div>
										<div className="flex-1">
											<span>{`${panel.biomarkers.length} biomarkers`}</span>
										</div>
										<div>
											<ArrowUpRightIcon className="size-5" />
										</div>
									</div>
								</div>
							</button>
						</div>
					))}
				</div>
			</div>

			{/* Actions section */}
			<div className="lg:flex lg:justify-end px-6 py-6">
				<div>
					<Button width="full" href="/panels/create">
						Create a panel
					</Button>
				</div>
			</div>
		</div>
	)
}

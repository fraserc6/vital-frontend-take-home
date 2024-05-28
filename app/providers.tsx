/**
 * Delcare providers for the app
 *
 * This is typically where you'd place global contexts
 * and other elements such as portals and notifications
 *
 * We abstract this from layout.tsx so we can include
 * client side components without forcing the root
 * layout to be client side itself
 */

"use client"

import { Toaster } from "sonner"
import { SWRConfig } from "swr"

/**
 * Global SWR fetcher
 *
 * In this example app, we setup the global config for SWR.
 * As the Vital API is restricted to server to server requests,
 * we point SWR to the local API which acts as a proxy.
 *
 * @param url
 * @returns
 */
const fetcher = async (url: string) => {
	const res = await fetch(url)

	// Handle error
	if (!res.ok) {
		throw new Error("An error occurred while fetching the data.")
	}

	return res.json()
}

export default function Providers({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<SWRConfig
			value={{
				fetcher,
			}}
		>
			{children}
			<Toaster />
		</SWRConfig>
	)
}

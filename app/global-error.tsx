/**
 * Global error fallback
 *
 * This page is rendered when an unhandled error
 * is thrown within the app.
 *
 * Note: triggers on production only, local dev
 * will trigger standard Next.js error overlay
 */

"use client"

import Button from "./components/button"

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<html>
			<body>
				<div className="flex justify-center items-center w-full h-full">
					<div className="text-center max-w-md">
						<h1 className="text-lg tracking-tight">Something went wrong</h1>
						<p className="text-zinc-500 mt-2">
							The page encountered an error, please try again or go back to the
							homepage.
						</p>
						<div className="mt-6 flex gap-3 justify-center">
							<Button color="black" onClick={() => reset()}>
								Try again
							</Button>
							<Button color="gray" href="/">
								Back to home
							</Button>
						</div>
					</div>
				</div>
			</body>
		</html>
	)
}

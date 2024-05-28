/**
 * Page not found
 *
 * This page is rendered when an an unkown
 * URL is visited, essentially acting as the
 * 404 page for the app
 */

import Button from "@/app/components/button"

export default function NotFound() {
	return (
		<div className="flex justify-center items-center w-full h-full">
			<div className="text-center max-w-md">
				<h1 className="text-lg tracking-tight">Page not found</h1>
				<p className="text-zinc-500 mt-2">
					The page your looking for does not exist.
				</p>
				<div className="mt-6 flex  justify-center">
					<Button color="gray" href="/">
						Back to home
					</Button>
				</div>
			</div>
		</div>
	)
}

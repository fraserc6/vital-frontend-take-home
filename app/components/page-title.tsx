/**
 * Page title component
 *
 * Renders the title section of a page
 * with an optional back arrow
 */

import { ArrowLeftIcon } from "@heroicons/react/16/solid"
import Link from "next/link"

export default function PageTitle({
	title,
	backHref,
	backAction,
}: {
	title: string
	backHref?: string
	backAction?: () => void
}) {
	const backButtonClass = `hover:bg-zinc-50 hover:text-zinc-700 duration-150 rounded-lg size-7 flex justify-center items-center`
	return (
		<div className="border-b border-zinc-100 pt-8 pb-3 px-6">
			<div className="flex gap-1.5 items-center">
				{backHref && (
					<Link href={backHref} className={backButtonClass}>
						<ArrowLeftIcon className="size-5" />
					</Link>
				)}
				{backAction && (
					<button
						type="button"
						onClick={backAction}
						className={backButtonClass}
					>
						<ArrowLeftIcon className="size-5" />
					</button>
				)}
				<h2 className="text-lg tracking-tight">{title}</h2>
			</div>
		</div>
	)
}

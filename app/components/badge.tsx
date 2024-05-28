/**
 * Generic badge component
 *
 * Includes a simple gray style, but can be
 * easily expanded to include whatever colours
 * are required
 */

export default function Badge({ label }: { label: string }) {
	return (
		<span className="bg-zinc-50 shrink-0 inline-block border rounded-md font-medium shadow shadow-zinc-50 text-xs text-zinc-500 px-2 py-1">
			{label}
		</span>
	)
}

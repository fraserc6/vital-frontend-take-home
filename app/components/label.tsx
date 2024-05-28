/**
 * Generic input label component
 */

export default function Label({
	children,
	...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
	return (
		<label className="block text-sm font-medium text-zinc-600" {...props}>
			{children}
		</label>
	)
}

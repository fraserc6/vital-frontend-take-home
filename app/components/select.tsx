/**
 * Select component
 *
 * Wraps a native <select /> element with the following:
 * - Label
 * - Error state
 * - Styling
 */

import { forwardRef } from "react"
import Label from "./label"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string
	error?: string
}

/**
 * Individual select option
 */
export function SelectOption({
	value,
	label,
}: {
	value: string
	label: string
}) {
	return <option value={value}>{label}</option>
}

/**
 * Select component
 */
const Select = forwardRef<HTMLInputElement, SelectProps>(
	({ label, error, children, ...props }, ref) => {
		return (
			<div>
				{label && (
					<div className="mb-2.5">
						<Label>{label}</Label>
					</div>
				)}
				<select
					className={`border px-3 py-2.5 rounded-md w-full text-sm ${
						error ? "border-red-600" : "border-zinc-200 "
					}`}
					{...props}
				>
					{children}
				</select>
				{error && (
					<p className="text-red-600 text-sm font-medium mt-2">{error}</p>
				)}
			</div>
		)
	}
)

Select.displayName = "Select"
export default Select

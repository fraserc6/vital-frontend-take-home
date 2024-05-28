/**
 * Text input component
 *
 * Wraps a native <input /> element with the following:
 * - Label
 * - Error state
 * - Styling
 */

import { forwardRef } from "react"
import Label from "./label"

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({ label, error, ...props }, ref) => {
		return (
			<div>
				{label && (
					<div className="mb-2.5">
						<Label>{label}</Label>
					</div>
				)}
				<input
					className={`border px-3 py-2.5 rounded-md w-full text-sm ${
						error ? "border-red-600" : "border-zinc-200 "
					}`}
					{...props}
				/>
				{error && (
					<p className="text-red-600 text-sm font-medium mt-2">{error}</p>
				)}
			</div>
		)
	}
)

TextInput.displayName = "TextInput"

export default TextInput

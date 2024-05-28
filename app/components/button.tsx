/**
 * Button component
 *
 * Creates either a styled <button /> or <Link />
 * depending on whether `onClick` or `href` if passed
 */

import { cva } from "class-variance-authority"
import Link from "next/link"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	href?: string
	color?: "black" | "white" | "gray"
	size?: "sm" | "md" | "lg"
	width?: "full" | "default"
}

const buttonClass = cva(
	"rounded-lg font-medium duration-150 inline-flex gap-2.5 justify-center items-center border",
	{
		variants: {
			color: {
				black: "bg-black text-white hover:bg-zinc-700 border-black",
				white: "bg-white text-zinc-600 hover:bg-zinc-100",
				gray: "bg-zinc-100 text-zinc-500 border-transparent hover:bg-zinc-200",
			},
			size: {
				sm: "px-3 py-1.5 sm:text-sm",
				md: "px-4 py-2 sm:text-sm",
				lg: "px-5 py-2.5 sm:text-base",
			},
			width: {
				full: "w-full",
				default: "",
			},
			state: {
				default: "",
				disabled: "opacity-50",
			},
		},
		defaultVariants: {
			color: "black",
			size: "md",
			state: "default",
			width: "default",
		},
	}
)

export default function Button({
	children,
	size,
	color,
	width,
	href,
	...props
}: ButtonProps) {
	// Render anchor link
	if (href) {
		return (
			<Link
				href={href}
				className={buttonClass({
					size,
					color,
					width,
					state: props.disabled ? "disabled" : "default",
				})}
			>
				{children}
			</Link>
		)
	}

	// Render button
	return (
		<button
			type="button"
			className={buttonClass({
				size,
				color,
				width,
				state: props.disabled ? "disabled" : "default",
			})}
			{...props}
		>
			{children}
		</button>
	)
}

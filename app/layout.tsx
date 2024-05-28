/**
 * Root layout
 *
 * The entry point for the entire app.
 * This is where you'd initialise global styles,
 * fonts, metadata and other global elements.
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Providers from "./providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Fraser Cook | Vital Frontend Task",
	description: "Fraser Cook's submission for the Vital frontend take home test",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} antialiased bg-gradient-to-br from-zinc-50 to-zinc-100`}
			>
				<Providers>
					<div className="w-screen h-screen flex justify-center items-center">
						<div className="w-full h-full lg:max-w-3xl lg:rounded-3xl bg-white shadow-2xl shadow-black/10 lg:border-8 lg:border-black/5 lg:h-[600px]">
							{children}
						</div>
					</div>
				</Providers>
			</body>
		</html>
	)
}

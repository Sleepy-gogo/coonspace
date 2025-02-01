/* eslint-disable @typescript-eslint/no-require-imports */
import { withUt } from "uploadthing/tw";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default withUt({
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx,mdx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'var(--font-geist-sans)',
					...fontFamily.sans
				]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {},
			typography: {
				invert: {
					css: {
						'--tw-prose-pre-bg': "#1e293b"
					}
				}
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require('@tailwindcss/typography')
	],
} satisfies Config); 

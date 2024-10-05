import type { Config } from "tailwindcss";

const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
    darkMode: ["class"],
    content: [
    	"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    	"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    	"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  	],
  	theme: {
		screens: {
			sm: "375px",
			md: "768px",
			lg: "1200px"
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem"
			},
		},
		extend: {},
	},
	plugins: [],
};
export default config;

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['Roboto', 'Helvetica', 'sans-serif'],
		},
		extend: {
			colors: { 
				'huella-green': 'rgba(234,253,238,0.9)',
				'huella-text-green': 'rgb(0,110,79)',
				'huella-text-light-green': 'rgb(65,173,86)',
				'huella-text-gray': '#575757',
				'huella-text-gray-ligth': '#f9f9f9',
				'huella-text-blue': '#6AC1EE',
				'huella-dark-blue': ' #1D70B7',
			},
		},
	},
	plugins: [require('tailwindcss-animated')],
};


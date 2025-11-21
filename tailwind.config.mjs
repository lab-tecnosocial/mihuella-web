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
				'huella-text-green': '#1E7B5C',
				'huella-text-light-green': '#3BB273',
				'huella-text-gray': '#575757',
				'huella-text-gray-ligth': '#f9f9f9',
			},
		},
	},
	plugins: [require('tailwindcss-animated')],
};

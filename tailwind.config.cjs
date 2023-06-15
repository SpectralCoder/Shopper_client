/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				mono: {
				  'snow': '#F9FAFB',
				  'gainsboro': '#DCDCDC',
				  'platinum': '#E5E4E2',
				  'silver': '#C0C0C0',
				  'charcoal': '#464646',
				  'onyx': '#353535',
				  'black': '#000000',
				  'white': '#FAFAFA',
				  'light-gray': '#E5E5E5',
				  'gray': '#CCCCCC',
				  'dark-gray': '#555555',
				  'black': '#222222',
				},
			  },

			fontFamily: {
				'poppins': ['Poppins'],
				sans: ['Helvetica', 'Arial', 'sans-serif'],
				serif: ['Georgia', 'Times New Roman', 'serif'],
			},
      fontSize: {        
        'header': ['64px', {
        lineHeight: '64px',
        fontWeight: '800'
        }],
        'sub-header': ['28px', {
          lineHeight: '40px',
          fontWeight: '700'
          }],
        'paragraph': ['18px', {
          lineHeight: '26px',
          fontWeight: '500'
          }],
      }
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			'light',
			'dark',
			'cupcake',
			'bumblebee',
			'emerald',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'pastel',
			'fantasy',
			'wireframe',
			'black',
			'luxury',
			'dracula',
			'cmyk',
			'autumn',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter'
		]
	}
};

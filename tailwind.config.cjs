/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'poppins': ['Poppins'],
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

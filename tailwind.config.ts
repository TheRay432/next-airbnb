import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: '#ffffff',
  			foreground: '#020817',
			hometitle: '#FF385C',
  			card: {
  				DEFAULT: '#ffffff',
  				foreground: '#020817'
  			},
  			popover: {
  				DEFAULT: '#ffffff',
  				foreground: '#020817'
  			},
  			primary: {
  				DEFAULT: '#2563eb',
  				foreground: '#f8fafc'
  			},
  			secondary: {
  				DEFAULT: '#f1f5f9',
  				foreground: '#0f172a'
  			},
  			muted: {
  				DEFAULT: '#f1f5f9',
  				foreground: '#64748b'
  			},
  			accent: {
  				DEFAULT: '#f1f5f9',
  				foreground: '#0f172a'
  			},
  			destructive: {
  				DEFAULT: '#ef4444',
  				foreground: '#f8fafc'
  			},
  			border: '#e2e8f0',
  			input: '#e2e8f0',
  			ring: '#2563eb',
  			chart: {
  				'1': '#e76e50',
  				'2': '#2a9d90',
  				'3': '#274754',
  				'4': '#e8c468',
  				'5': '#f4a462'
  			},
			moreBtn: '#222222',
			footer: '#F7F7F7'
  		},
  		borderRadius: {
  			lg: '0.5rem',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		flexBasis: {
			'7/100': '7%',
		}
  	}
  },
  plugins: [function({ addUtilities }) {
	addUtilities({
		'.scrollbar-none': {
			'scrollbar-width': 'none',
		},
	})
  },require("tailwindcss-animate")],
};
export default config;

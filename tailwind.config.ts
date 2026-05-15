import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d1117',
        card: '#161b22',
        'card-hover': '#1a1f2e',
        border: '#30363d',
        'nav-glass': 'rgba(13, 17, 23, 0.8)',
        accent: '#58a6ff',
        'accent-hover': '#79b8ff'
      }
    }
  },
  plugins: []
}

export default config

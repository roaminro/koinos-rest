const { nextui } = require('@nextui-org/react')
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        whitesmoke: {
          '100': '#f5f5f5',
          '200': '#eee'
        },
        gray: {
          '100': '#212123',
          '200': '#1e1e1e',
          '300': '#161515',
          '400': '#141412',
          '500': '#100f0f',
          '600': 'rgba(255, 255, 255, 0)'
        },
        white: '#fff',
        chocolate: '#e56910',
        orangered: '#e94910',
        mediumblue: '#6210e9'
      },
      spacing: {},
      fontFamily: {
        satoshi: 'Satoshi',
        inherit: 'inherit',
        'clash-display': "'Clash Display'",
        inter: 'Inter'
      },
      borderRadius: {
        '68xl': '87px',
        '9xl': '28px'
      }
    },
    fontSize: {
      '3xs': '10px',
      xs: '12px',
      base: '16px',
      xl: '20px',
      '5xl': '24px',
      '21xl': '40px',
      '29xl': '48px',
      inherit: 'inherit'
    }
  },
  corePlugins: {
    preflight: false
  },
  darkMode: 'class',
  plugins: [nextui()]
}
export default config

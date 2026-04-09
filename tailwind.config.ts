import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ow-primary': '#f99e1a',
        'ow-accent': '#41a6f6',
        'ow-accent-glow': '#5affff',
        'ow-bg-dark': '#1a1e2e',
        'ow-text': '#e8edf3',
        'ow-text-muted': '#7e8a9e',
        'ow-status-online': '#7cff00',
        'ow-status-busy': '#bd1d2c',
        'ow-status-away': '#f7cc1d',
        'ow-danger': '#ff4655',
      },
      fontFamily: {
        'ow-title': ['Rajdhani', 'Teko', 'Impact', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        'ow-body': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      backgroundImage: {
        'ow-gradient': 'linear-gradient(135deg, #1a1e2e 0%, #0d1117 100%)',
      },
    },
  },
  plugins: [],
}
export default config

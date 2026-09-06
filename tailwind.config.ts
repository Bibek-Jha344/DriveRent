import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { ink: '#17231f', moss: '#315c49', lime: '#d8f06b', paper: '#f4f5ef' }, fontFamily: { display: ['Georgia', 'serif'], sans: ['Arial', 'sans-serif'] } } },
  plugins: []
} satisfies Config;

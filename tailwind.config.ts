import type { Config } from 'tailwindcss';
const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./lib/**/*.{ts,tsx}'],
  theme: { extend: { colors: { background:'#050912', panel:'#0c1526', accent:'#2f7bff', good:'#15b86a', warn:'#ffb020', bad:'#f04438' } } },
  plugins: []
};
export default config;

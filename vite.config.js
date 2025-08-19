import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  content: {
    pipeline: {
      include: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    },
  },
  theme: {
    fontFamily: {
      rubik: 'Rubik, sans-serif',
    },
  },
})

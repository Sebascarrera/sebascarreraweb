import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import obfuscator from 'vite-plugin-javascript-obfuscator'

// Dominio propio ⇒ base en "/"
// © Juan Sebastián Carrera Moya · JSCM-2026. El código de las experiencias se ofusca en el build
// (los juegos y las animaciones de la portada) y no se publican source maps.
export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    obfuscator({
      apply: 'build',
      include: [
        /src\/pages\/experience\/.*\.(js|jsx)$/,
        /src\/cine\/(initCine|juega|retrato|obra|protect)\.js$/,
        /src\/protect\.js$/,
      ],
      exclude: [/node_modules/],
      options: {
        compact: true,
        simplify: true,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false,
        stringArray: true,
        stringArrayThreshold: 0.5,
        stringArrayEncoding: [],
        rotateStringArray: true,
        shuffleStringArray: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        selfDefending: false,
        debugProtection: false,
        disableConsoleOutput: false,
        transformObjectKeys: false,
        unicodeEscapeSequence: false,
        splitStrings: false,
        numbersToExpressions: false,
        sourceMap: false,
      },
    }),
  ],
  base: '/',            // ⚠️ Importante para custom domain
  build: { outDir: 'dist', sourcemap: false }
})

/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const {
  toRGB,
  withOpacityValue
} = require('@left4code/tw-starter/dist/js/tailwind-config-helper')

const LightenDarkenColor = (col, amt) => {
  const num = parseInt(col.substr(1), 16)
  const r = (num >> 16) + amt
  const b = ((num >> 8) & 0x00ff) + amt
  const g = (num & 0x0000ff) + amt
  const newColor = g | (b << 8) | (r << 16)
  return `#${newColor.toString(16)}`
}

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{php,html,js,jsx,ts,tsx,vue}',
    './resources/**/*.{php,html,js,jsx,ts,tsx,vue}',
    './node_modules/@left4code/tw-starter/**/*.js',
    './/*.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rgb: toRGB({
          inherit: colors.inherit,
          current: colors.current,
          transparent: colors.transparent,
          black: colors.black,
          white: colors.white,
          slate: colors.slate,
          gray: colors.gray,
          zinc: colors.zinc,
          neutral: colors.neutral,
          stone: colors.stone,
          red: colors.red,
          orange: colors.orange,
          amber: colors.amber,
          yellow: colors.yellow,
          lime: colors.lime,
          green: colors.green,
          emerald: colors.emerald,
          teal: colors.teal,
          cyan: colors.cyan,
          sky: colors.sky,
          blue: colors.blue,
          indigo: colors.indigo,
          violet: colors.violet,
          purple: colors.purple,
          fuchsia: colors.fuchsia,
          pink: colors.pink,
          rose: colors.rose
        }),
        primary: withOpacityValue('--color-primary'),
        'primary-shade': LightenDarkenColor(colors.blue[900], 40),
        secondary: withOpacityValue('--color-secondary'),
        success: withOpacityValue('--color-success'),
        info: withOpacityValue('--color-info'),
        warning: withOpacityValue('--color-warning'),
        pending: withOpacityValue('--color-pending'),
        danger: withOpacityValue('--color-danger'),
        light: withOpacityValue('--color-light'),
        dark: withOpacityValue('--color-dark'),
        slate: {
          50: withOpacityValue('--color-slate-50'),
          100: withOpacityValue('--color-slate-100'),
          200: withOpacityValue('--color-slate-200'),
          300: withOpacityValue('--color-slate-300'),
          400: withOpacityValue('--color-slate-400'),
          500: withOpacityValue('--color-slate-500'),
          600: withOpacityValue('--color-slate-600'),
          700: withOpacityValue('--color-slate-700'),
          800: withOpacityValue('--color-slate-800'),
          900: withOpacityValue('--color-slate-900')
        },
        darkmode: {
          50: withOpacityValue('--color-darkmode-50'),
          100: withOpacityValue('--color-darkmode-100'),
          200: withOpacityValue('--color-darkmode-200'),
          300: withOpacityValue('--color-darkmode-300'),
          400: withOpacityValue('--color-darkmode-400'),
          500: withOpacityValue('--color-darkmode-500'),
          600: withOpacityValue('--color-darkmode-600'),
          700: withOpacityValue('--color-darkmode-700'),
          800: withOpacityValue('--color-darkmode-800'),
          900: withOpacityValue('--color-darkmode-900')
        }
      },
      fontFamily: {
        roboto: ['Roboto'],
        inter: ['Inter'],
        barlow: ['Barlow']
      },
      container: {
        center: true
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%'
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
  variants: {
    extend: {
      boxShadow: ['dark']
    }
  }
}

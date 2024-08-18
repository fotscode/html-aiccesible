import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {
            background: "#FFFFFF", // or DEFAULT
            foreground: "#11181C", // or 50 to 900 DEFAULT
            divider: "rgba(0, 0, 0, 0.15)",
            default: {
              900: "#FFFFFF",
            },
            focus: "#000000",
            primary: {
              50: "#FFECDD",
              100: "#FFCBB0",
              200: "#FEA980",
              300: "#FC8950",
              400: "#FA671F",
              500: "#D14805",
              600: "#AF3B02",
              700: "#7E2A01",
              800: "#4D1800",
              900: "#200600",
              foreground: "#FFFFFF",
              DEFAULT: "#D14805",
            },
            secondary: {
              foreground: "#000000",
              DEFAULT: "#8F3200",
            },
            success: "#0C6435",
            warning: "#F5A524",
            danger: "#AE0943",
          },
        },
        dark: {
          layout: {},
          colors: {
            background: "#000000", // or DEFAULT
            foreground: "#ECEDEE", // or 50 to 900 DEFAULT
            divider: "rgba(255, 255, 255, 0.15)",
            default: {
              900: "#18181B",
            },
            focus: "#FFFFFF",
            primary: {
              50: "#FFECE0",
              100: "#FFCCB3",
              200: "#FAAB84",
              300: "#F78A54",
              400: "#F46A25",
              500: "#DA500C",
              600: "#AB3E08",
              700: "#7B2B05",
              800: "#4B1900",
              900: "#1E0600",
              foreground: "#FFFFFF",
              DEFAULT: "#C24609",
            },
            secondary: {
              foreground: "#FFFFFF",
              DEFAULT: "#D14805",
            },
            success: "#28BD5F",
            warning: "#F5A524",
            danger: "#EC83A1",
          },
        },
      },
    }),
  ],
  darkMode: "class",
}
export default config

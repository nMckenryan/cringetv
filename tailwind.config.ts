import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import daisyui from "daisyui"


export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      aspectRatio: {
        poster: '2 / 3'
      },
      colors: {
        'primary-blue': '#1E2738',
        'background-black': '#20211A',
        'accent-gold': '#FFD700',
        'text-white': "#FFFFFF",
        'secondary-purple': "#4A314D",
        'primary-blue-light': '#2C4257',
        'primary-blue-dark': '#0E1319',
        'secondary-purple-light': '#6A4565',
        'secondary-purple-dark': '#2A1C2D',
        'accent-gold-muted': '#DAA520',    // Slightly desaturated gold
        'accent-gold-light': '#FFE87C',    // Brighter gold variant
      }
    },
  },
  plugins: [daisyui],
} satisfies Config;

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
      colors: {
        'primary-blue': '#1E2738',
        'background-black': '#20211A',
        'accent-gold': '#FFD700',
        'text-white': "#FFFFFF",
        'secondary-purple': "#4A314D"
      }
    },
  },
  plugins: [daisyui],
} satisfies Config;

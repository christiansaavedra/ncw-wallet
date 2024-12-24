/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        space: ['"Space Grotesk"', "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        crypto: {
          primary: "#6366f1",
          secondary: "#8b5cf6",
          accent: "#3b82f6",
          dark: "#1e1b4b",
          light: "#818cf8",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "crypto-gradient":
          "linear-gradient(to right, #6366f1, #8b5cf6, #3b82f6)",
      },
      animation: {
        gradient: "gradient 8s ease infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
      },
    },
  },
  plugins: [],
};

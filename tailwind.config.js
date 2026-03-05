/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b1120",
        foreground: "#f8fafc",
        card: "#111827",
        border: "#1f2937",
        primary: "#f59e0b",
        muted: "#94a3b8",
        destructive: "#ef4444",
      },
    },
  },
  plugins: [],
}
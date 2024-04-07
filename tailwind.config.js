/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        own: "3px 6px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};

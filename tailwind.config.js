module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xl: { max: "1439px" },
      lg: { max: "1279px" },
      md: { max: "1023px" },
      sm: { max: "767px" },
      xs: { max: "639px" },
      "2xs": { max: "413px" },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [import("tailwindcss-safe-area")],
};

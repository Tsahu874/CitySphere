// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#55799eff", // Deep Navy
        secondary: "#BFC9CA", // Warm Gray
        silver: "#D5D8DC", // Pale Silver
        gold: "#cbad35ff", // Rich Gold

        charcoal: "#2C3E50", // Deep Muted Blackish Blue – Great for headers, cards, shadows
        cream: "#F8F4EC", // Warm Cream – Subtle background for sections or cards
        blush: "#66564eff", // Soft Blush – Adds warmth and elegance (buttons, accents)
        sage: "#A3B18A", // Soft Green-Sage – Nature vibe for highlights or icons
        peachy: "#E6B8A2",
      },
    },
  },
  plugins: [],
};

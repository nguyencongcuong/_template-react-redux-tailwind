module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
			color: {
				min: {
					1: "#E6E6E6",
					2: "#CCCCCC",
					3: "#B3B3B3",
					4: "#999999",
					5: "#808080",
					6: "#666666",
					7: "#4D4D4D",
					8: "#333333",
					9: "#1A1A1A"
				},
				cyan: {
					1: "#DFE6E6",
					2: "#BECDCD",
					3: "#9EB4B4",
					4: "#7E9C9C",
					5: "#627F7F",
					6: "#4E6565",
					7: "#3B4C4C",
					8: "#273333",
					9: "#141919"
				}
			},
			animation: {
        fadeIn: "fadeIn 1s ease-in-out",
				fadeOut: "fadeOut 1s ease-in-out"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
				fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        }
      }
		}
  },
  variants: {
    extend: {},
  },
  plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms')({
			strategy: 'class',
		}),
	],
}

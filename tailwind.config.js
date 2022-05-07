module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      
      backgroundImage: {
      'hero-pattern': "url('/public/background.png')",
      'button_area': "url('/public/button_area.png')",
      'discode_icon': "url('/public/discode_icon.png')",
      'inst_icon': "url('/public/inst_icon.png')",
      'twiter_icon': "url('/public/twiter_icon.png')",
      'footer': "url('/public/footer.png')",
    }},
  },
  plugins: [],
}

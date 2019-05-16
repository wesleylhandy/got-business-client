import Typography from "typography"

const typography = new Typography({
  googleFonts: [
    {
      name: 'Bungee Shade',
      styles: [
        '400',
      ]
    },
    {
      name: 'Open Sans',
      styles: [
        '400',
        '400i',
        '600',
        '600i',
        '700',
        '700i'
      ]
    }
  ],
  baseFontSize: "19px",
  baseLineHeight: '1.5',
  headerFontFamily: ['Bungee Shade', 'cursive'],
  headerWeight: '400',
  headerColor: 'navy',
  bodyWeight: 'normal',
  bodyFontFamily: ['Open Sans', 'Arial', 'sans-serif'],
  bodyColor: 'navy',
})

export const { scale, rhythm, options } = typography

export default typography
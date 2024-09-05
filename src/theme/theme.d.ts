import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    newPrimary: Palette['primary'];
    textExtra: Palette['primary'];
    third: Palette['primary'];
    buttonOutline: Palette['primary'];
    textInput: Palette['primary'];
  }

  interface PaletteOptions {
    newPrimary?: PaletteOptions['primary'];
    textExtra?: PaletteOptions['primary'];
    third?: PaletteOptions['primary'];
    buttonOutline?: PaletteOptions['primary'];
    textInput?: PaletteOptions['primary'];
  }
}
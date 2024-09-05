import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#0c487f',
    },
    secondary: {
      main: '#878787',
    },
    error: {
      main: '#B1D8FB',
    },
    warning: {
      main: '#4398e7',
    },
    info: {
      main: '#083148',
    },
    success: {
      main: '#347EC2',
    },
    newPrimary: {
      main: '#B1D8FB',
    },
    textExtra: {
      main: '#084E8E',
    },
    third: {
      main: '#5E5F5F',
    },
    buttonOutline: {
      main: '#878787',
    },
    textInput: {
      main: '#F8FFA2',
    },
  },
  typography: {
    fontFamily: '"Noto Sans Thai", "IBM Plex Sans Thai", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&family=Noto+Sans+Thai:wght@100..900&display=swap');
      `,
    },
  },
};

const theme = createTheme(themeOptions);

// Extend typography
theme.typography.h1 = {
  fontSize: '2.5rem',
  '@media (min-width:500px)': {
    fontSize: '3rem',
  },
};

export default theme;
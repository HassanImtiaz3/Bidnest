import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673de6',
      sub: '#9896F0'
    },
    secondary: {
      main: '#00c9a7', // Hostinger teal
    },
    background: {
      default: '#f9f9f9', // Light background
    },
    text: {
      primary: '#000000', // Dark text
      secondary: '#ffffff', // Light text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "5px", // Rounded corners for all buttons
        },
      },
    },
  },
});

export default theme;

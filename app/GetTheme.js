'use client'
import { createTheme } from "@mui/material";
export const dashboardTheme = createTheme({
    palette: {
      background:{
        default:'#03045e'
      },
      primary: {
        main: '#392deb',
        light:'#42a5f5'
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#E0C2FF',
        light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#47008F',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  //choose diff background for home page,etc
  export const homeTheme= createTheme({
    palette: {
      background:{
        default:'#03071e'
      },
      primary: {
        main: '#392deb',
        light:'#42a5f5'
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#E0C2FF',
        light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#47008F',
      },
    },
    typography: {

      fontFamily: [


        'sans-serif',
      ].join(','),
    },
  });
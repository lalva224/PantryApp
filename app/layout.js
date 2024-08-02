import { Inter } from "next/font/google";
import "./globals.css";
import { theme } from "./GetTheme";
import { ThemeProvider } from "@mui/material";
import { CssBaseline,Box } from '@mui/material/';
import { homeTheme } from "./GetTheme";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body
      
      >
        <ThemeProvider theme={homeTheme}>
          <CssBaseline/>
          
          
             {children}
          
       
        </ThemeProvider>
        
        
        
        </body>
    </html>
  );
}

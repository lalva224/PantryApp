import { Inter } from "next/font/google";
import "../globals.css";
import { dashboardTheme } from "../GetTheme";
import { Box, ThemeProvider } from "@mui/material";
import { CssBaseline } from '@mui/material/';
const inter = Inter({ subsets: ["latin"] });




export default function Layout({ children }) {
  return (
    
    
        <ThemeProvider theme = {dashboardTheme}>
          <CssBaseline/>
          <Box
          sx={{
             background:'-webkit-linear-gradient(left, #43C6AC, #191654)'
          }}
          >
        {children}
        </Box>
        </ThemeProvider>
        
        
      
  );
}

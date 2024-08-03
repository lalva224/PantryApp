import { Inter } from "next/font/google";
import "../globals.css";
import { dashboardTheme } from "../GetTheme";
import { ThemeProvider ,Box} from "@mui/material";
import { CssBaseline } from '@mui/material/';
const inter = Inter({ subsets: ["latin"] });



//css modules??
export default function Layout({ children }){
    
  return (
    
    
        <ThemeProvider theme = {dashboardTheme}>
          <CssBaseline/>
          <Box
          sx={{
             background:'-webkit-linear-gradient(left,#0f0c29,#302b63,#24243e)',
             height:'100vh'
          }}
          >
        {children}
        </Box>
        </ThemeProvider>
        
        
      
  );
}

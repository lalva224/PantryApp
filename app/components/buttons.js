import { Home } from '@mui/icons-material'
import React from 'react'
import Link from '@mui/material/Link';
import { Box, Container, Grid, IconButton,Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { CameraIcon } from "../icons/CameraIcon";

export const HomeButton = () => {
  return (
    <Box
          sx={{
            display:'flex',
            justifyContent:{xs:'center',lg:'flex-end'}
            
          }}
          
          >
        <Link href='/'>
                <Button
            variant='contained'
                sx={{
                    color:'white',
                    backgroundColor:'red',
                    ":hover":{
                      backgroundColor:'#6a040f'
                    }
                }}
                
            >
                 Home
                </Button>
                </Link>
                </Box>
  )
}

export const CameraButton =({handleCameraClick})=>{
    return(
        <IconButton onClick={handleCameraClick}
           sx={{
            ml:'1rem'
           }}
           >
            <CameraIcon/>
          </IconButton>  
    )
}



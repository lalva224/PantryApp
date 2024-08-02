"use client"
import { Box, Button,Typography } from '@mui/material'
import { Container } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link';

const Home = () => {
  return (
    <>
    
    <Box
   sx={{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    m:{xs:'4rem',md:'2rem'},
    
   }}
    
    >
    <Typography
    variant='h1'
    sx={{
        fontWeight:'bold',
        textAlign:'center',
        background:'-webkit-linear-gradient(left, #2980B9, #6DD5FA,#FFFFFF)',
        WebkitTextFillColor:'transparent',
        WebkitBackgroundClip:'text',
        lineHeight:1.4,
        mt:'2rem',
        fontSize:{xs:'6vh',md:'10vh',lg:'15vh'}


    }}
    >
        AI Pantry Tracker
    </Typography>

    <Typography

    sx={{
        color:'white',
        textAlign:'center',
        fontSize:{xs:'1.5rem',md:'1.75rem',lg:'1.9rem'},
        
    }}
    >
        Easily organize your pantry inventory. Enter items manually or snap a quick picture!
    </Typography>

    <Box
    sx={{
        mt:'2rem'
    }}
    >
    
                <Link href='/dashboard'>
                <Button
            variant='contained'
                sx={{
                    color:'white'
                }}
            >
                 Dashboard
                </Button>
                </Link>
    
    
                    
    
    </Box>
    </Box>
    </>
  )
}

export default Home

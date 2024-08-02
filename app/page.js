"use client"
import { Box, Button,Typography } from '@mui/material'
import { Container } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link';

const Home = () => {
  return (
    <>
    
    <Container
   sx={{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    margin:'2rem'
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
        mt:'2rem'



    }}
    >
        AI Pantry Tracker
    </Typography>

    <Typography

    sx={{
        color:'white',
        textAlign:'center',
        fontSize:'4vh'
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
    </Container>
    </>
  )
}

export default Home

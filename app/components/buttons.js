import { Home } from '@mui/icons-material'
import React from 'react'
import Link from '@mui/material/Link';
import {Box,Button} from '@mui/material'
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



import React from 'react'
import { Modal,Box,Typography,Stack, TextField,Button } from '@mui/material'
import { useState } from 'react';

const addModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };
  const editModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };



export const AddModal = ({addItem,setQuantity,items,setItems,quantity}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <>
    
    <Button  variant ={'contained'}onClick={handleOpen} sx={{mt:'3rem'}}>Add</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={addModalStyle}>
      <Stack direction={'column'} alignItems={'center'} spacing={2}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb:'1rem'}}>
          Add Items
        </Typography>
        <Stack direction={'row'} spacing={2}> 
          <TextField label='item' onChange={(e)=>setItems(e.target.value)}/>
            <TextField label='#' type="number" sx={{width:'5rem'}} onChange={(e)=>setQuantity(e.target.value)}/>
          <Button variant = {'outlined'} onClick={()=>{
            addItem(items)
            //not needed
            // setQuantity('')
            // setItems('')
            handleClose()
          }}
          >Add</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
    </>
  )
}


export  function EditModal({updateItem,itemId,item}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quantity,setQuantity] = useState(0)
  return (
    <>
          <Button variant="contained" onClick={handleOpen}
                     
              >Edit</Button>

        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={editModalStyle}>
                  <Stack direction={'column'} alignItems={'center'} spacing={2}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Quantity
                  </Typography>
                    <Stack direction={'row'} spacing={5}>
                    
                  
                  <TextField placeholder={quantity} type='number'
                    onChange={(e)=>setQuantity(e.target.value)}
                  sx={{
                    width:'5rem',
                    
                  }}
                  
                  ></TextField>
                  <Button variant='contained'
                  onClick={()=>{
                    console.log(quantity,item,itemId)
                    updateItem(quantity,item,itemId)
                    handleClose()
                  }
                  }
                  >Ok</Button>
                 </Stack>
                 </Stack>
                  
        </Box>
      </Modal>
        
      </>
  );
  
}



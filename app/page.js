"use client"
import Image from "next/image";
import { ingredients } from "./ingredients";
import { Box, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import {db} from '@/firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { useState,useEffect } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { RemoveIcon } from "./icons/RemoveIcon";
// import { getPantry,addItem,removeItem } from "./actions/serverActions";
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [pantry,setPantry] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [items,setItems] = useState('')
    
  const getPantry = async()=>{
    try{
      const pantryCollection = collection(db,'pantry')
      const pantryDocs = await getDocs(pantryCollection)
      //pantryDocs is a QuerySnapShot object with forEach u iterate through each querysnapshot instance.
      //however, with map u can only iterate through an array which u need map for
      const pantryItems = pantryDocs.docs.map(doc=>({
        id: doc.id,
        data: doc.data()['Item']
      }
      ))
      setPantry(pantryItems)
      
    }
    catch(error){
      console.log(error)
    }

  }
    const addItem = async()=>{
      await addDoc(collection(db,'pantry'),{
        'Item':items
      })
      await getPantry()
    }
  
     const removeItem = async(itemId)=>{
      console.log(itemId)
      const ref = doc(db,'pantry',itemId)
      await deleteDoc(ref)
      await getPantry()
    }
  //render pantry upon initial render, no items dependency because items is updated after every single key stroke
  useEffect(()=>{

    getPantry()
    
  },[])
  // console.log(pantry)
  return (
    <>
        
      <Container
          sx={{
            textAlign:'center'
          }}
      >
     <Button  variant ={'contained'}onClick={handleOpen} sx={{mt:'3rem'}}>Add</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb:'1rem'}}>
          Add
        </Typography>
        <Stack direction={'row'} spacing={2}> 
          <TextField label='item' onChange={(e)=>setItems(e.target.value)}/>
          <Button variant = {'outlined'} onClick={()=>{
            addItem(items)
            setItems('')
            handleClose()
          }}
          >Add</Button>
        </Stack>
      </Box>
    </Modal>
        
        <Box
        
        display = {'flex'}
        alignItems={'center'}
        justifyContent={'center'}
       flexDirection={'column'}
       sx={{
        mt:'10vh'
       }}
        >
          <Box width = '800px' height = '100px' bgcolor={'#023e8a'}>
          <Typography variant = 'h2'> Pantry Items</Typography>
          </Box>
        
        
        <Stack spacing = {3} 
        width='800px'
        height= '300px'
        overflow={'auto'}
        
        >
        {pantry.map((ingredient)=>(
          
            
          <Box
          key ={ingredient['id']}
          sx ={{
           
            bgcolor:'#f0f0f0',
            width:'100%',
            height:'80px',
            
            
          }}
          
          >
            <Stack direction={'row'}
            spacing={40}
            
            >
            <IconButton onClick={()=>{
             
              removeItem(ingredient['id'])
            }}
              >
            <RemoveIcon/>
            </IconButton>


            <Typography
            variant="h4"
            fontWeight={'bold'}
            alignItems={'center'}
            justifyContent={'center'}
            textAlign={'center'}
            >
              {
                ingredient['data'].charAt(0).toUpperCase() + ingredient['data'].slice(1)
              }
            </Typography>

            </Stack>
          </Box>
          

          
       
        ))}
        </Stack>
        </Box>
      </Container>
    </>
  );
}

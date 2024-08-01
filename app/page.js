"use client"
import Image from "next/image";
import { ingredients } from "./ingredients";
import { Box, Container, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import {db} from '@/firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query,setDoc,updateDoc,where } from "firebase/firestore";
import { useState,useEffect } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { RemoveIcon } from "./icons/RemoveIcon";
import { AddModal, EditModal } from "./Modals/Modal";
// import { getPantry,addItem,removeItem } from "./actions/serverActions";


export default function Home() {
  const [pantry,setPantry] = useState([])
  const [items,setItems] = useState('')
  const [quantity,setQuantity] = useState(0)
  const getPantry = async()=>{
    try{
      const pantryCollection = collection(db,'pantry')
      const pantryDocs = await getDocs(pantryCollection)
      //pantryDocs is a QuerySnapShot object with forEach u iterate through each querysnapshot instance.
      //however, with map u can only iterate through an array which u need map for
      const pantryItems = pantryDocs.docs.map(doc=>({
        id: doc.id,
        item: doc.data()['item'],
        quantity: doc.data()['quantity']
      }
      ))
      setPantry(pantryItems)
      
    }
    catch(error){
      console.log(error)
    }

  }
    const addItem = async()=>{
      
      const q = query(collection(db, 'pantry'), where('Item', '==', items));
      const querySnap = await getDocs(q)
      if(querySnap.empty){
      await addDoc(collection(db,'pantry'),{
        'item':items,
        'quantity':quantity
      })
      await getPantry()
    }
    else{
      console.log('Already in DB')
    }
    }
  
     const removeItem = async(itemId)=>{
      console.log(itemId)
      const ref = doc(db,'pantry',itemId)
      await deleteDoc(ref)
      await getPantry()
    }

    const updateItem = async (quantity,item,itemId)=>{
      console.log(quantity,item,itemId)
      if(quantity==0){
        await removeItem(itemId)
      }
      else{
      const ref = doc(db,'pantry',itemId)
      await updateDoc(ref,{
        quantity:quantity
      })
      await getPantry()
    }
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
     
     {/* /{addItem,setQuantity,setItems,handleClose} */}
        <AddModal addItem={addItem} setQuantity={setQuantity} items={items} setItems={setItems} />

        
        <Box
        
        display = {'flex'}
        alignItems={'center'}
        justifyContent={'center'}
       flexDirection={'column'}
       sx={{ mt: '10vh' }}
      
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
            // justifyContent={'space-evenly'}
            
            >
              {/**columnSpacing={{ xs: 1, sm: 2, md: 3 }} */}
               <Grid container spacing={2} alignItems="center" >
      {/* Trash Icon */}
      <Grid item>
        <IconButton onClick={() => removeItem(ingredient['id'])}>
          <RemoveIcon />
        </IconButton>
      </Grid>
      
      {/* Item Text */}
      <Grid item xs>
        <Typography variant="h4" fontWeight="bold">
          {ingredient['item'].charAt(0).toUpperCase() + ingredient['item'].slice(1)}
        </Typography>
      </Grid>
      
      {/* Quantity */}
      <Grid item>
        <Typography variant="h5">
          {ingredient['quantity']}
        </Typography>
      </Grid>
      
      {/* Edit Modal */}
      <Grid item>
        <EditModal
          itemId={ingredient['id']}
          updateItem={updateItem}
          item={ingredient['item']}  // Fixed key 'item' instead of 'Item'
          quantity={ingredient['quantity']}
        />
      </Grid>
    </Grid>
              
               
            


            
            
            
            
            
            </Stack>

            
          </Box>
          

          
       
        ))}
        </Stack>
        </Box>
      </Container>
    </>
  );
}

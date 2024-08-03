"use client"
import Image from "next/image";
import { ingredients } from "../ingredients";
import { Box, Container, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import {db} from '@/firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query,setDoc,updateDoc,where } from "firebase/firestore";
import { useState,useEffect,useRef } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { RemoveIcon } from "../icons/RemoveIcon";
import { AddModal, EditModal } from "../Modals/Modal";
import Link from '@mui/material/Link';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { imageRecognition } from "./OpenAI/actions";
import { SearchBar } from "../components/searchStyles";
import { HomeButton } from "../components/buttons";
import { useMediaQuery } from '@mui/material';
import { CameraButton } from "../components/buttons";
const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY
  }
});



export default function Home() {
  const isSmall= useMediaQuery('(max-width:600px)');
  const [pantry,setPantry] = useState([])
  const [items,setItems] = useState('')
  const [quantity,setQuantity] = useState(0)
  const [searchParam,setSearchParam] = useState('')
  const [imageUrl,setImageUrl] = useState('')


  const filteredPantry = pantry.filter(({item})=>
    item.toLowerCase().startsWith(searchParam.toLowerCase())
  )
 

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
    const addItem = async(item,quantity)=>{
      console.log('adding item')
      console.log(item,quantity)
      const q = query(collection(db, 'pantry'), where('Item', '==', items));
      const querySnap = await getDocs(q)
      if(querySnap.empty){
      await addDoc(collection(db,'pantry'),{
        'item':item,
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
 
    const uploadFile = async (event) => {
      const file = event.target.files[0]
      console.log('file:',file)
      const bucketName = "leandro-pantry-images";
      const fileKey = file.name 
      //url = https://leandro-pantry-images.s3.amazonaws.com/fileName/.jpeg
      const params = {
        Bucket: bucketName,
        Key: fileKey,
        Body: file,
        ContentType: file.type
      }
      const command = new PutObjectCommand(params);

      try {
        await s3Client.send(command);
       
        const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
        console.log(fileUrl)
        setImageUrl(fileUrl)
        const response = await imageRecognition(fileUrl)
        const arr = response.split('.')
        const name = arr[0]
        const quantity_string = arr[1]
        //use regex if openai gives Quantity:2 instead of just 2 (ignores my instructions)
        const open_ai_quantity = Number(quantity_string.match(/(\d+)/)[0])

        //console.log(name)
        
        // console.log('quantity string:',quantity_string)
        
        
        await addItem(name,open_ai_quantity)

        console.log(response)
      } catch (error) {
        console.error(error);
      }

      
    }
    //this ref is attached to the camera file input. Once the camera icon clicked, the input ref clicks on the input field.
    const fileInputRef = useRef(null)

    const handleCameraClick = ()=>{
      fileInputRef.current.click()
    }



  
  //render pantry upon initial render, no items dependency because items is updated after every single key stroke
  useEffect(()=>{

    getPantry()
    
  },[])

  
  // console.log(pantry)
  return (
    <>
        
      <Box
          sx={{
            textAlign:'center',
            
          }}
      >
          
        <HomeButton/>
        

        
        <Box
        
        display = {'flex'}
        alignItems={'center'}
        justifyContent={'center'}
       flexDirection={'column'}

        >
          <Box width = '100%' height = '100%' sx={{mb:'2rem'}}>
          <Typography variant = 'h2' 
          sx={{color:"white",
             fontWeight:'bold',
             fontSize:{xs:'2rem',lg:'3rem'},
             mt:'1rem'
            }}
          > Pantry Items</Typography>
          </Box>
          <Box
          >
              {/**used box here instead of stack because the stack makes the other elements flex grow to the size of largest element. */}
          </Box>
          {isSmall &&
          <CameraButton handleCameraClick={handleCameraClick}/>
          }
           <Box
          sx={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around',
            alignItems:'center',
            mb:'2rem'
          }}
          > 

          
        {/* <Stack direction='row' spacing={2} sx={{mb:'2rem'}}> */}

         <SearchBar/>

          <AddModal addItem={addItem} setQuantity={setQuantity} items={items} setItems={setItems} quantity={quantity} />
          
          {
            !isSmall &&
            <CameraButton handleCameraClick={handleCameraClick}/> 
          }
              
          
          
          <input
            type ='file'
            ref={fileInputRef}
            accept="image/*"
            capture='environment'
            onChange={uploadFile}
            style={{
              display:'none'
            }}
          /> 
          </Box> 

          {/**camera on next line if small */}
          
           {/* </Stack>  */}
        <Stack spacing = {3} 
        
        sx={{
          width:{
            xs:370,
            sm:500,
            md:600,
            lg:800,
           
          },
          height:{
            xs:400,
            sm:500,
           
           
          
            
          },
          overflow:'auto'
        }}
        
        
        >
        {filteredPantry.map((ingredient)=>(
          
            
          <Paper
          key ={ingredient['id']}
          elevation={3}
          sx ={{
            // background: '-webkit-linear-gradient(left,#8e9eab,#eef2f3)',
            background:'e9ecef',
            width:'100%',
            height:'80px',
            
            
          }}
          
          >
            
            
               <Grid container spacing={2} alignItems="center" >
      {/* Trash Icon */}
      <Grid item>
        <IconButton onClick={() => removeItem(ingredient['id'])}>
          <RemoveIcon />
        </IconButton>
      </Grid>
      
      {/* Item Text */}
      <Grid item xs>
        <Typography variant="h5" fontWeight="bold">
          {ingredient['item'].charAt(0).toUpperCase() + ingredient['item'].slice(1)}
        </Typography>
      </Grid>
      
      {/* Quantity */}
      <Grid item>
        <Typography variant="h5"
        fontWeight='bold'
        >
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
              
               
            


            
            
            
            
            
          

            
          </Paper>
          

          
       
        ))}
        </Stack>
        </Box>
      </Box>
    </>
  );
}

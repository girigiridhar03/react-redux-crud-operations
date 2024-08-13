import { Box, Button, FormLabel, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postDetails, singleUser, upDateUser } from '../redux/app/store';

const FormDetails = () => {

   const dispatch = useDispatch();
   
   const {users,singleData} = useSelector((state)=>state.app);
 
   const [formDetails,setFormDetails] = useState({
      username: '',
      phone:'',
      email:'',
      age:'',
      salary:''
   })

   useEffect(()=>{
    if(singleData){
        setFormDetails({
            username: singleData.username || '',
            phone: singleData.phone || '',
            email: singleData.email || '',
            age: singleData.age || '',
            salary: singleData.salary || ''
          });
      }
      else{
        setFormDetails({
           username: '',
           phone:'',
           email:'',
           age:'',
           salary:''
        })
      }
     
   },[singleData])


 
   const [message,setMessage] = useState('');

   const handleChange = (e) =>{
       const {name,value} = e.target;
       
       setFormDetails({...formDetails,[name]:value})
   }

   const handleSubmit = ()=>{
     if(!formDetails.username && !formDetails.phone && !formDetails.email && !formDetails.age && !formDetails.salary ){
         setMessage('Please Fill The Above Filed');
         setTimeout(() => {
            setMessage('')
         }, 5000);
     }
     else{

        if(singleData){
            const id = users.find((user) => user.id === singleData.id)?.id;
            if (id) {
              dispatch(upDateUser({ id, formData: formDetails }));
              dispatch(singleUser(""))
            }
        }
        else{
            dispatch(postDetails(formDetails));
            setMessage("Form Data Add SuccessFully");
            setTimeout(() => {
                setMessage('')
             }, 5000);

        }
     }
    


     return setFormDetails({
        username: '',
        phone:'',
        email:'',
        age:'',
        salary:''
     })
   }


  return (
    <Box w={['90%','90%','80%','70%']} mx={"auto"} mt={"2rem"}>
        <Box fontSize={'2rem'} textAlign={'center'} fontWeight={'700'} color={'purple'} textTransform={'uppercase'} my={'1rem'}>Users Form</Box>
        <form style={{width:'100%',display:'flex',flexDirection:'column',gap:'0.5rem',justifyContent:'flex-start',alignItems:'flex-start'}}>
            <FormLabel fontWeight={'600'} fontSize={'1.1rem'}>User Name</FormLabel>
            <Input type='text' size={'lg'} placeholder='Enter UserName' name='username' value={formDetails.username} onChange={handleChange} />
            <FormLabel fontWeight={'600'} fontSize={'1.1rem'}>Phone No.</FormLabel>
            <Input type='number' size={'lg'} placeholder='Enter Phone number' name='phone' value={formDetails.phone} onChange={handleChange} />
            <FormLabel fontWeight={'600'} fontSize={'1.1rem'}>Email</FormLabel>
            <Input type='email' size={'lg'} placeholder='Enter Email' name='email' value={formDetails.email} onChange={handleChange} />
            <FormLabel fontWeight={'600'} fontSize={'1.1rem'}>Age</FormLabel>
            <Input type='number' size={'lg'} placeholder='Enter Age' name='age' value={formDetails.age} onChange={handleChange} />
            <FormLabel fontWeight={'600'} fontSize={'1.1rem'}>Salary</FormLabel>
            <Input type='number' size={'lg'} placeholder='Enter Salary' name='salary' value={formDetails.salary}  onChange={handleChange} />
            <Button  colorScheme='blue' px={'2rem'} textTransform={'uppercase'} letterSpacing={'0.1rem'} fontWeight={'bold'} py={'1rem'} onClick={handleSubmit}>{singleData ? "update" : "Submit"}</Button>
        </form>
       {
         message && <Box fontWeight={'bold'} color={message === 'Please Fill The Above Filed' ? 'red' : 'green'} fontSize={'1.1rem'} textAlign={'center'} my={'0.5rem'}>{message}</Box>
       }
    </Box>
  )
}

export default FormDetails

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  let emailRef = useRef()
  let passwordRef = useRef()


  const handleSignupForm = async() =>{
    setLoading(true)
    if(emailRef.current.value.includes(".com") || emailRef.current.value.includes("@")){
      let obj = {
        email:emailRef.current.value,
        password:passwordRef.current.value
      }
      try{  
      let data = await fetch(`${import.meta.env.VITE_BASE_URL}/users/signup`,{
          method:"POST",
          body:JSON.stringify(obj),
          headers:{
            "Content-Type":"application/json"
          }
        })
        let res = await data.json()
        if(res.message == 'signup successful'){
          toast({
            title:res.message,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setLoading(false)
          navigate('/login')
        }
        else{
          toast({
            title:res.message,
            status: 'warning',
            duration: 9000,
            isClosable: true,
          })
        }

      }catch(err){
        setLoading(false)
        toast({
          title:'something went wrong.',
          description: err.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }else{
      setLoading(false)
      toast({
        title:'Please check your mail.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign up to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"  ref={emailRef} required/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" ref={passwordRef} required/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Link to="/login">I Have an Account</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                onClick={handleSignupForm}
                isLoading={loading}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
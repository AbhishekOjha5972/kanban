import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'

const Navbar = () => {
  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' p="10px" bg="cyan">
    <Box p='2'>
      <Heading size='md'><Link to='/'>App</Link></Heading>
    </Box>
    <Spacer/>
    <ButtonGroup gap='2'>
      <Button colorScheme='teal'><Link to="/"></Link></Button>
      <Button colorScheme='teal'><Link to="/"></Link></Button>
      <Button colorScheme='teal'><Link to="/"></Link></Button>
    </ButtonGroup>
  </Flex>
  )
}

export default Navbar
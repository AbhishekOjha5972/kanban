import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Std_Heading = ({title,quantity}) => {
  return (
    <Box className="std-heading-component">
        <Text>{title} ({quantity})</Text>
    </Box>
  )
}

export default Std_Heading
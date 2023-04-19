import { Box, Image } from '@chakra-ui/react'
import React from 'react'
const LoadingPages = () => {
    return (
        <Box className='loading-pages' display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh">
            <img src='../../public/mainLoading.gif' alt='Loading...'/>
        </Box>
    )
}

export default LoadingPages
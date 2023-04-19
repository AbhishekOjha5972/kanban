import { Skeleton, SkeletonCircle, SkeletonText, Box, Stack } from '@chakra-ui/react'
import React from 'react'

const LoadingForText = () => {
    return (
            <Stack padding="10px" height="50px">
                <Skeleton height='20px' borderRadius="20px"/>
            </Stack>
    )
}

export default LoadingForText
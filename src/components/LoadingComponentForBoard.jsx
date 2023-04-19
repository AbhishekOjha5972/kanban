import React from 'react'
import { Box, HStack, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

const LoadingComponentForBoard = () => {
    return (
        <Stack className='board-Loading'>
            {
                new Array(10).fill(0).map((_, i) => {
                    return <HStack 
                    className='skeleton-board-option' key={i}>
                        <Skeleton height='40px' width='30px' />
                        <Skeleton height='40px'>
                            <SkeletonText></SkeletonText>
                        </Skeleton>
                    </HStack>
                })}
        </Stack >
    )
}

export default LoadingComponentForBoard
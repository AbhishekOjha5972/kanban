import { Box, Skeleton, Stack} from '@chakra-ui/react'
import React from 'react'
const LoadingTaskComponents = () => {
    return (
        <Stack>
            {
                [0,0,0,0,0].map((_, i) => {
                    return <Box key={i} className='task-loading-css'>
                        <Skeleton width="100%" height="20px" />
                        <Skeleton width="100%" height="20px" />
                        <Skeleton width="30%" height="5px" />
                    </Box>
                })
            }
        </Stack>
    )
}

export default LoadingTaskComponents
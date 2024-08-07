import { Box, Skeleton } from "@mui/material"

export const ProfileSkeletons = () => {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'space-between' }}>
            <Skeleton animation="wave" variant="rounded" width={'55%'} height={250} />
            <Skeleton animation="wave" variant="rounded" width={'45%'} height={250} />
          </Box>
        </Box>
    )
}
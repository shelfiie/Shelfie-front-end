import { Box, Skeleton } from "@mui/material"

export const ReviewsSkeleton = () => {
    return (
        <Box sx={{ display: 'grid', gap: '1rem' }}>
            <Skeleton variant="rounded" animation="wave" width="100%" height={200} />
            <Skeleton variant="rounded" animation="wave" width="100%" height={200} />
            <Skeleton variant="rounded" animation="wave" width="100%" height={200} />
            <Skeleton variant="rounded" animation="wave" width="100%" height={200} />
        </Box>
    )
}
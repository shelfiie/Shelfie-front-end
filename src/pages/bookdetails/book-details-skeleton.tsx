import { Box, Skeleton } from "@mui/material";

export const BookDetailsSkeleton = () => (
    <Box sx={{paddingTop: '1rem', display: 'flex', gap: '3rem', alignItems: 'center'}}>
        <Skeleton variant="rounded" width={200} height={300} />
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Skeleton variant="text" width={700} height={50} />
            <Skeleton variant="text" width={300} height={30} />
            <Skeleton variant="text" width={450} height={20} />
            <Skeleton variant="rectangular" width={700} height={200} />
        </Box>
    </Box>
);

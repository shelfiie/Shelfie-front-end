import { Box, Skeleton } from "@mui/material";

const TabPanelSkeleton = () => {
    return (
        <Box sx={{display: 'flex', gap: '3.5rem', flexWrap: 'wrap'}}>
            <Skeleton animation="wave" variant="rounded" width={200} height={280} />
            <Skeleton animation="wave" variant="rounded" width={200} height={280} />
            <Skeleton animation="wave" variant="rounded" width={200} height={280} />
            <Skeleton animation="wave" variant="rounded" width={200} height={280} />
            <Skeleton animation="wave" variant="rounded" width={200} height={280} />
            <Skeleton animation="wave" variant="rounded" width={200} height={280} />
            <Skeleton animation="wave" variant="rounded" width={200} height={280} />
            <Skeleton animation="wave" variant="rounded" width={200} height={280} />
            <Skeleton animation="wave" variant="rounded" width={200} height={280} />
            <Skeleton animation="wave" variant="rounded" width={200} height={280} />
        </Box>
    );
}

export { TabPanelSkeleton }
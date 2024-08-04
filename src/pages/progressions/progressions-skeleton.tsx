import { Box, Skeleton } from "@mui/material";

const styles = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    flexWrap: 'wrap'
};

export const ProgressionSkeleton = () => {
    return (
        <Box sx={styles}>
            <Skeleton variant="rectangular" animation="wave" width={330} height={250} />
            <Skeleton variant="rectangular" animation="wave" width={330} height={250} />
            <Skeleton variant="rectangular" animation="wave" width={330} height={250} />
            <Skeleton variant="rectangular" animation="wave" width={330} height={250} />
        </Box>
    );
}
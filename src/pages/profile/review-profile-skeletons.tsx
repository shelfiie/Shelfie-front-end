import { Box, Skeleton } from "@mui/material"

const ReviewProfileSkeletons = () => {
    return (
        <>
            <Skeleton animation="wave" height={30} width="30%" style={{ marginBottom: 6 }}
            />
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'space-between' }}>
                <Skeleton animation="wave" variant="rounded" width={'45%'} height={140} />
                <Skeleton animation="wave" variant="rounded" width={'55%'} height={140} />
                <Skeleton animation="wave" variant="rounded" width={'55%'} height={140} />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'space-between' }}>
                <Skeleton animation="wave" variant="rounded" width={'45%'} height={140} />
                <Skeleton animation="wave" variant="rounded" width={'55%'} height={140} />
                <Skeleton animation="wave" variant="rounded" width={'55%'} height={140} />
            </Box>
        </>
    )
}

export { ReviewProfileSkeletons }
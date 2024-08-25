import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import { Menu, MenuItem, Stack } from '@mui/material';
import { useState } from 'react';
import { ReportStatus } from '../../types/bookData';

type FilterReportsProps = {
    onFilterChange: (status: ReportStatus) => void;
}

export const FilterReports = ({ onFilterChange }: FilterReportsProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const handleMenuItemClick = (status: ReportStatus) => {
        onFilterChange(status);
        handleClose();
    };

    return (
        <>
            <Stack direction={'row'} spacing={2}>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleMenuItemClick(ReportStatus.TODOS)} disableRipple>Todos</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick(ReportStatus.PENDENTE)} disableRipple>Pendentes</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick(ReportStatus.RESOLVIDO)} disableRipple>Resolvidos</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick(ReportStatus.RECUSADO)} disableRipple>Recusados</MenuItem>
                </Menu>
            </Stack>
            <FilterAltRoundedIcon
                onClick={handleClick}
                sx={{ transition: 'all 0.3s ease-in-out', '&:hover': { scale: '1.3', cursor: 'pointer' } }}
            />
        </>
    )
}

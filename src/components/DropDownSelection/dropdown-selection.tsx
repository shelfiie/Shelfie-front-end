import React, { useState } from 'react';
import { Arrow } from '../../assets/icons/Arrow.svg.tsx';
import { Theme } from '../../styles/theme.ts';
import { DropDownSelectionProps, DropDownStyles, DropDownType, Option } from './index.styles.ts';
import { Autocomplete, Menu, MenuItem, OutlinedInput, Select, SelectChangeEvent, styled, TextField } from '@mui/material';
import { BookData } from '../../types/bookData.ts';
import { BookService } from '../../api/services/BookService.ts';

const StyledSelect = styled(Select)({
    width: '100%',
    backgroundColor: Theme.colors.blue,
    color: Theme.colors.white,
    fontFamily: 'inherit',
    borderRadius: Theme.borders.radius,
    border: `${Theme.borders.border3px} solid black`,
    '& svg': {
        fill: Theme.colors.white
    },
    '& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
        backgroundColor: Theme.colors.blue

    },
    '& .MuiPaper-root': {
        backgroundColor: Theme.colors.blue
    }
});

const StyledMenuItem = styled(MenuItem)({
    backgroundColor: Theme.colors.blue,
    color: Theme.colors.white,

    '&.Mui-selected': {
        backgroundColor: Theme.colors.lightBlue,
        '&:hover': {
            backgroundColor: Theme.colors.deepBlue,
        }
    },
    '&:hover': {
        backgroundColor: Theme.colors.deepBlue,
    }
})

const StyledMenu = styled(Menu)({
    '& .MuiPaper-root': {
        backgroundColor: Theme.colors.blue,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Exemplo de box-shadow
        color: Theme.colors.white
    }
});


const SelectStyle = {
    width: '100%', backgroundColor: Theme.colors.blue,
    color: Theme.colors.white, fontFamily: 'inherit',
    borderRadius: Theme.borders.radius,
    border: Theme.borders.border3px + ' solid black',
    '& svg': {
        fill: Theme.colors.white
    },
    '&.css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
        backgroundColor: Theme.colors.blue
    }
}

// const StyledMenuItem = styled(MenuItem)({
//     width: '100%', backgroundColor: Theme.colors.blue,
//     color: Theme.colors.white, fontFamily: 'inherit',
//     borderRadius: Theme.borders.radius,
//     border: Theme.borders.border3px + ' solid black',
//     '& svg': {
//         fill: Theme.colors.white
//     },
//     '&.css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
//         backgroundColor: Theme.colors.blue
//     }
// })

export const MUIDropDown = (googleId: BookData) => {
    // to-do options vai ser um hook pra fazer a logica pegando o atual status do book
    const options = ['QUERO LER', 'LENDO', 'LIDO', 'ABANDONADO'];

    const [option, setOption] = useState<string>('');
    const handleChange = (event: SelectChangeEvent) => {
        setOption(event.target.value as string);
        console.log(option)
    };

    const handleBookStatus = () => {
        console.log("googleId: ", googleId.googleId);
        const service = new BookService();
        const response = service.postBookStatus({ googleId: googleId.googleId, status: option });
        console.log(response);
    }

    return (
        <>
            <Select
                displayEmpty
                sx={SelectStyle}
                value={option}
                input={<OutlinedInput />}
                onChange={handleChange} >
                <StyledMenuItem disabled value="">SELECIONAR</StyledMenuItem>
                {options.map((option, index) => (
                    // <StyledMenu open={true}>
                        <StyledMenuItem
                            id={`menu-item-${index}`}
                            onClick={handleBookStatus}
                            key={index}
                            value={option}>
                            {option}
                        </StyledMenuItem>
                    // </StyledMenu>
                ))}

            </Select>
        </>
    )
}

export const DropDownSelection: React.FC<DropDownType & DropDownSelectionProps> = ({ content, options, propsSelectedOptions, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(content);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        console.log("alteraçao do componente filho, passando para o pai: ", option);
        setIsOpen(false);
    };

    return (
        <DropDownStyles {...props} isOpen={isOpen} onClick={() => {
            setIsOpen(!isOpen);
        }} >
            {selectedOption.toUpperCase()}
            <Arrow isOpen={isOpen} fill={Theme.colors.white} />
            <ul>
                {options ? options.map((option, index) => (
                    <Option
                        key={index}
                        value={option}
                        onClick={() => handleOptionClick(option)}>
                        {option}
                    </Option>
                )) : <></>}
            </ul>
        </DropDownStyles>
    )
}
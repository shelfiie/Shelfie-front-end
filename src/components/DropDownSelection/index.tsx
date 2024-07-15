import React, { useState } from 'react';
import { Arrow } from '../../assets/icons/Arrow.svg.tsx';
import { Theme } from '../../styles/theme';
import { DropDownSelectionProps, DropDownStyles, DropDownType, Option } from './index.styles.ts';
import { Autocomplete, MenuItem, OutlinedInput, Select, SelectChangeEvent, styled, TextField } from '@mui/material';
import { BookData } from '../../types/bookData.ts';
import { Brightness1 } from '@mui/icons-material';
import { BookService } from '../../api/services/BookService.ts';


const StyledUTxtField = styled(TextField)({
    // backgroundColor: Theme.colors.blue,
})

const StyledAutocomplete = styled(Autocomplete)({
    backgroundColor: Theme.colors.blue,
    color: Theme.colors.white,
    borderRadius: Theme.borders.radius,
    borderStyle: 'none',
    '& svg': { fill: Theme.colors.white },
    '& fieldset': {
        border: Theme.borders.border3px + ' solid black',
        color: Theme.colors.white
    },
    '& label': {
        color: Theme.colors.white,
        fontFamily: 'inherit'
    },
})

const MenuItemStyle = {
    backgroundColor: Theme.colors.blue,
    color: Theme.colors.white,
    fontFamily: 'inherit',
    '&:hover':
    {
        backgroundColor: Theme.colors.blue,
        filter: 'brightness(0.8)'
    },
    '&.Mui-selected':
    {
        backgroundColor: Theme.colors.blue
    }
}

const SelectStyle = {
    width: '100%', backgroundColor: Theme.colors.blue, color: Theme.colors.white, fontFamily: 'inherit',
    '& svg': {
        fill: Theme.colors.white
    },
    '&.css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
        backgroundColor: Theme.colors.blue
    }
}

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
                <MenuItem disabled value="" sx={MenuItemStyle}>SELECIONAR</MenuItem>
                {options.map((option, index) => (
                    <MenuItem
                        id={`menu-item-${index}`}
                        sx={MenuItemStyle}
                        onClick={handleBookStatus}
                        key={index}
                        value={option}>
                        {option}
                    </MenuItem>
                ))}

            </Select>
            {/* 
            <StyledAutocomplete
                clearOnEscape={false}
                id="combo-box-demo"
                options={options}
                inputValue={inputValue}
                value={selectedValue}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                onChange={(event, selectedValue) => {
                    setSelectedValue(selectedValue);
                    console.log("alteraçao do componente pai: ", selectedValue);
                }}
                renderOption={(props, option) => {
                    return (
                        <li {...props}>
                            {option}
                        </li>
                    )
                }}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        placeholder='SELECIONAR'
                        InputLabelProps={{ shrink: false }} />}
            /> */}
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
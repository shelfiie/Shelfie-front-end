import React, { useState } from 'react';
import { Arrow } from '../../assets/icons/Arrow.svg.tsx';
import { Theme } from '../../styles/theme';
import { DropDownSelectionProps, DropDownStyles, DropDownType, Option } from './index.styles.ts';

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
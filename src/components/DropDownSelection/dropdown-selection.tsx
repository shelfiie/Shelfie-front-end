import React, { useState } from 'react';
import { Arrow } from '../../assets/icons/Arrow.svg.tsx';
import { Theme } from '../../styles/theme.ts';
import { DropDownStyles, Option } from './index.styles.ts';
import { Alert, Snackbar } from '@mui/material';
import { BookData, BookStatus } from '../../types/bookData.ts';
import { BookService } from '../../api/services/BookService.ts';
import { bookOptions } from '../../api/hooks/useBookStatus.ts';
import { StatusCode } from '../../api/client/IHttpClient.ts';

type DropDownSelectionProps = {
    content: string;
    googleId: BookData['googleId'];
}

export const DropDownSelection: React.FC<DropDownSelectionProps> = ({ googleId, content, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [success, setSuccess] = useState<string | null>();
    const [error, setError] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState(content);

    const handleOptionClick = async (option: string) => {
        setSelectedOption(option);
        const service = new BookService();

        if (option !== 'SELECIONAR') {
            const response = await service.postBookStatus({ googleId: googleId, bookStatus: selectedOption as BookStatus });

            if (response?.statusCode === StatusCode.Created) {
                setSuccess(response?.resolve);
            } else {
                setError(response?.reject);
            }
            console.log(response);
        }


        setIsOpen(false);
    };

    return (
        <DropDownStyles
            backgroundcolor={Theme.colors.orange}
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            color={Theme.colors.white}
            fontSize={Theme.font.sizes.xsmall}
            {...rest}>

            {selectedOption.toUpperCase()}

            <Arrow isOpen={isOpen} fill={Theme.colors.white} />

            <ul>
                {bookOptions ? bookOptions.map((option, index) => (
                    <Option
                        key={index}
                        value={option}
                        onClick={() => handleOptionClick(option)}>
                        {option}
                    </Option>
                )) : <></>}
            </ul>

            {error &&
                <Snackbar
                    sx={{ marginRight: '4rem' }}
                    open={!!error}
                    autoHideDuration={5000}
                    onClose={() => setError(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert severity='error'>{error}</Alert>
                </Snackbar>}

            {success &&
                <Snackbar
                    sx={{ marginRight: '4rem' }}
                    open={!!success}
                    autoHideDuration={5000}
                    onClose={() => setSuccess(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert severity='success'>{success}</Alert>
                </Snackbar>}

        </DropDownStyles>
    )
}
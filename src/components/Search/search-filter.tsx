import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Theme } from '../../styles/theme';

type FilterProps = {
    setSearchParams: (params: { [key: string]: string }) => void;
    currentParams: { [key: string]: string };
}

const options = ['Tudo', 'Título', 'Autor', 'ISBN'];

export const Filter = ({ setSearchParams, currentParams }: FilterProps) => {
    return (
        <Autocomplete
            id='filter'
            size='small'
            sx={{
                width: '100%', backgroundColor: `${Theme.colors.white}`,
                borderStyle: 'none',
                borderRadius: `${Theme.borders.radius} 0 0 ${Theme.borders.radius} `,
                border: 'none',
                flex: '1',
                '& fieldset': {
                    border: 'none',
                },
                '& input': {
                    fontSize: `${Theme.font.sizes.xsmall}`,
                    fontFamily: `${Theme.font.family.poppins}`,
                    fontWeight: `${Theme.font.weight.bold}`,
                },
                '& .css-1c95u1g-MuiAutocomplete-root, .css-wb57ya-MuiFormControl-root-MuiTextField-root, .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root': {
                    height: '100%',
                },
            }}
            options={options}
            getOptionLabel={(option) => option}
            defaultValue={options[0]}
            onInputChange={(_event, newInputValue) => {
                setSearchParams({ ...currentParams, filter: newInputValue });
            }}
            renderInput={(params) => <TextField {...params}
                variant="outlined" />}
        />
    )
}



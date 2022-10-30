import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

import { localization } from '../../../resources';
import { Colors } from '../../../assets/colors';

import styles from './SearchInput.module.scss';

export function SearchInput() {
    return (
        <TextField
            className={styles['field']}
            classes={{
                root: styles['root'],
            }}
            variant='outlined'
            placeholder={localization.whatDoYouWant}
            sx={{
                "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                        borderColor: Colors.White
                    }
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                        borderWidth: "1px",
                        borderColor: Colors.White
                    }
                }
            }}
            InputProps={{
                classes: {
                    notchedOutline: styles['outline'],
                    focused: styles['focused'],
                    colorSecondary: styles['focused']
                },
                className: styles['input'],
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton>
                            <SearchIcon htmlColor={Colors.White} />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
}

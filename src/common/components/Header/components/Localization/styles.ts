import { SxProps } from "@mui/material";
import { Colors } from "assets/colors";

export const localizationStyles: SxProps = {
    justifyContent: 'space-between',
    fontSize: '0.7rem',
    minHeight: 30,
    "& button": {
        backgroundColor: Colors.Black,
        color: Colors.White,
        fontSize: 'inherit',
        fontWeight: 500,
        fontFamily: 'inherit',
        border: `1px solid ${Colors.Red}`,
        borderRadius: '13px',
        transition: 'all 0.3s ease',
    },
    "& button:hover": {
        backgroundColor: Colors.Red,
        color: Colors.White,
    },
    "& button.Mui-selected": {
        backgroundColor: Colors.Red,
        color: Colors.White,
    },
    "& button.Mui-selected:hover": {
        backgroundColor: Colors.Red,
        color: Colors.White,
    },
};
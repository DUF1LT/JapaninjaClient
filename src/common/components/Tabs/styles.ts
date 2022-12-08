import { SxProps } from "@mui/material";

import { Colors } from "assets/colors";

export const tabsStyles: SxProps = {
    justifyContent: 'space-between',
    "& button": {
        backgroundColor: Colors.Black,
        color: Colors.White,
        fontSize: 'inherit',
        fontWeight: 500,
        fontFamily: 'inherit',
        border: `1px solid ${Colors.White}`,
        borderRadius: 3,
    },
    "& button:active": {
        backgroundColor: Colors.White,
        color: Colors.Black,
    },
    "& button.Mui-selected": {
        backgroundColor: Colors.White,
        color: Colors.Black,
    }
};
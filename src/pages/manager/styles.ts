import { SxProps } from "@mui/material";
import { Colors } from "assets/colors";

export const managerTabsStyles: SxProps = {
    justifyContent: 'space-between',
    "& button": {
        backgroundColor: Colors.Black,
        color: Colors.White,
        fontSize: 'inherit',
        fontFamily: 'inherit',
        border: `1px solid ${Colors.White}`,
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
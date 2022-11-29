import { SxProps } from "@mui/material";
import { Colors } from "assets/colors";

export const couriersPanelTabsStyles: SxProps = {
    justifyContent: 'space-between',
    "& button": {
        width: 190,
        backgroundColor: Colors.Black,
        color: Colors.White,
        fontSize: 'inherit',
        fontWeight: 500,
        fontFamily: 'inherit',
        borderRadius: 2,
        border: `1px solid ${Colors.Red}`,
    },
    "& button:active": {
        backgroundColor: Colors.Red,
        color: Colors.White,
    },
    "& button.Mui-selected": {
        backgroundColor: Colors.Red,
        color: Colors.White,
    }
};
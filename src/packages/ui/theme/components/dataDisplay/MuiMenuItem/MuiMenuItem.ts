import {  MenuItemProps, Components } from "@mui/material";
import { StylePropsType } from "../../../types";

export const MuiMenuItem: Components['MuiMenuItem'] = {
    styleOverrides: {
        root: ({ theme }: StylePropsType<MenuItemProps>) => ({
            color: theme.palette.common.white,
        }),
    }
}
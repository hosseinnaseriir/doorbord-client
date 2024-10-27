import { CheckboxProps, Components } from "@mui/material";
import { StylePropsType } from "../../../types";

export const MuiCheckbox: Components['MuiCheckbox'] = {

    styleOverrides: {
        root: ({ theme }: StylePropsType<CheckboxProps>) => ({
            color: theme.palette.common.white,
        }),

    }
}
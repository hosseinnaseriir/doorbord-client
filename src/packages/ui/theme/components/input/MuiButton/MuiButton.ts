import { ButtonProps, Components } from "@mui/material";
import { StylePropsType } from "../../../types";

export const MuiButton: Components['MuiButton'] = {
    styleOverrides: {
        root: ({ theme }: StylePropsType<ButtonProps>) => ({
            background: `linear-gradient(180deg, #F4934C 0%, #ED6214 100%)`,
            color: theme.palette.common.white,
            borderRadius: theme.spacing(1.25),
            padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
            ...theme.typography.body1
        })
    }
}
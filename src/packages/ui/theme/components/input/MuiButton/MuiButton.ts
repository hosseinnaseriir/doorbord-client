import { buttonClasses, ButtonProps, Components } from "@mui/material";
import { StylePropsType } from "../../../types";

export const MuiButton: Components['MuiButton'] = {
    defaultProps: {
        variant: 'contained'
    },
    variants: [
        {
            props: {
                variant: "contained",
            },
            style: {
                background: `linear-gradient(180deg, #F4934C 100%, #ED6214 100%)!important`,
            }
        }
    ],
    styleOverrides: {
        root: ({ theme }: StylePropsType<ButtonProps>) => ({
            color: theme.palette.common.white,
            borderRadius: theme.spacing(1.25),
            padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
            ...theme.typography.body1,
            [`&.${buttonClasses.disabled}`]: {
                opacity: .75
            }
        }),

    }
}
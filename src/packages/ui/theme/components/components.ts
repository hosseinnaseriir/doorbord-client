import { Components, CssVarsTheme, Theme } from "@mui/material";
import { MuiButton, MuiTextField, MuiInputLabel, MuiFormControlLabel, MuiFormHelperText, MuiSelect, MuiCheckbox } from "./input";
import { MuiMenuItem, MuiTypography } from "./dataDisplay";
export const components: Components<Omit<Theme, "components" | "palette"> & CssVarsTheme> = {
    MuiButton,
    MuiTextField,
    MuiInputLabel,
    MuiFormControlLabel,
    MuiFormHelperText,
    MuiSelect,
    MuiMenuItem,
    MuiTypography,
    MuiCheckbox,
}

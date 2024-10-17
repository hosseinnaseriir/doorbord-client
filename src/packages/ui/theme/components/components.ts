import { Components, CssVarsTheme, Theme } from "@mui/material";
import { MuiButton, MuiTextField, MuiInputLabel, MuiFormControlLabel, MuiFormHelperText } from "./input";

export const components: Components<Omit<Theme, "components" | "palette"> & CssVarsTheme> = {
    MuiButton,
    MuiTextField,
    MuiInputLabel,
    MuiFormControlLabel,
    MuiFormHelperText
}

import { ThemeProvider } from "@mui/material";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import React from "react";
import { theme } from "../../../packages/ui";


export const UiProvider: React.FC<Omit<ThemeProviderProps, 'theme'>> = ({ ...props }) => {
    return (<ThemeProvider theme={theme} {...props} />);
}
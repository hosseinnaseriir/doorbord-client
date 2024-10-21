import { createTheme } from "@mui/material";
import { components } from "./components";

export const theme = createTheme({
    direction: 'rtl',

    typography: {
        fontFamily: 'vazirmatn'
    },
    palette: {
        common: {
            white: '#FFFFFF'
        },
        background: {
            default: '#000000',
            paper:"#1D1D1D"
        },
        secondary: {
            main: "#454545",
            dark: '#262626'
        },
        primary: {
            main: '#FF6000'
        }
    },
    components,
})
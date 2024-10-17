import { Components, FormHelperTextProps } from "@mui/material";
import { StylePropsType } from "../../../types";


export const MuiFormHelperText: Components['MuiFormHelperText'] = {
  styleOverrides: {
    root: ({ theme }: StylePropsType<FormHelperTextProps>) => ({
      fontSize: theme.spacing(1.75),
      textAlign: 'start',
      margin: '0 !important',
      paddingTop: theme.spacing(1),
    }),

  },
 
};

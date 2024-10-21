'use client'

import { Components, FormControlLabelProps } from "@mui/material";
import { StylePropsType } from "../../../types";

export const MuiFormControlLabel: Components['MuiFormControlLabel'] = {
  styleOverrides: {
    label: ({ theme }: StylePropsType<FormControlLabelProps>) => ({
      paddingInlineStart: theme.spacing(0.5),
      color: theme.palette.grey[500],
      ...theme.typography.body2,
      fontWeight: 400,
    }),
  },
};

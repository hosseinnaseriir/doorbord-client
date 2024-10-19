'use client'
import type { CSSProperties } from 'react';
import { Components, inputLabelClasses, InputLabelProps } from '@mui/material';
import { StylePropsType } from '../../../types';

export const MuiInputLabel: Components['MuiInputLabel'] = {
  styleOverrides: {
    root: ({ theme }: StylePropsType<InputLabelProps>) => ({
      margin: '0',
      maxWidth: '100% !important',
      ...theme.typography.body2,
      fontWeight: 400,
      color: theme.palette.common.white,
      [`&.${inputLabelClasses.disabled}`]: {
        color: theme.palette.text.disabled,
      },
      [`&.${inputLabelClasses.error}`]: {
        color: theme.palette.common.white,
      },
      position: 'relative !important' as CSSProperties['position'],
      transform: 'none !important',
      marginBottom: `${theme.spacing(1)} !important`,
      pointerEvents: 'initial',
    }),
  },
  variants: [
    {
      props: {
        error: true,
      },
      style: ({ theme }: StylePropsType<InputLabelProps>) => ({
        color: theme.palette.line.error + '!important',
      }),
    },
  ],
};

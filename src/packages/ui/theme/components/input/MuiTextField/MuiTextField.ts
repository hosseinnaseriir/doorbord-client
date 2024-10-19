
import { Components, inputBaseClasses, TextFieldProps } from '@mui/material';
import { StylePropsType } from '../../../types';


export const MuiTextField: Components['MuiTextField'] = {
  defaultProps: {
    size: 'medium',
    margin: 'normal',
    variant: 'outlined'
  },
  styleOverrides: {
    root: ({ theme }: StylePropsType<TextFieldProps>) => ({
      ...theme.typography.body2,
      margin: 0,
      boxSizing: 'border-box',
      width: '100%',
      fieldset: {
        display: 'none',
      },
      label: {
        margin: 0,
      },
      input: {
        padding: `${theme.spacing(1.25)} ${theme.spacing(1.5)}`,
        ...theme.typography.body2,
      },
      [`.${inputBaseClasses.root}`]: {
        paddingLeft: 0,
        borderRadius: theme.spacing(1),
        backgroundColor: 'transparent',
        border: `${theme.spacing(0.125)} solid ${theme.palette.grey[300]}`,
        color: theme.palette.common.white,
        '&:focus-within': {
          borderColor: `${theme.palette.primary.main}`,
        },
      },
      [`& .${inputBaseClasses.adornedStart}`]: {
        '& svg': {
          margin: theme.spacing(1),
        },
      },
      [`& .${inputBaseClasses.inputAdornedStart}`]: {
        paddingInlineStart: `${theme.spacing(1)} `,
        '& svg': {
          margin: theme.spacing(1),
        },
      },
    }),
  },
  variants: [
    {
      props: {
        error: true,
      },
      style: ({ theme }: StylePropsType<TextFieldProps>) => ({
        [`.${inputBaseClasses.root}`]: {
          border: `${theme.spacing(0.125)} solid ${theme.palette.error.main}`,
          '&:focus-within': {
            borderBottom: `${theme.spacing(0.125)} solid ${theme.palette.error.main}`,
          },
        },
      }),
    },
    {
      props: {
        size: 'small',
      },
      style: ({ theme }: StylePropsType<TextFieldProps>) => ({
        ...theme.typography.body2,
        paddingLeft: theme.spacing(1),
        input: {
          padding: `${theme.spacing(1)}`,
        },
      }),
    },
    {
      props: {
        multiline: true,
      },
      style: ({ theme }: StylePropsType<TextFieldProps>) => ({
        [`.${inputBaseClasses.root}`]: {
          padding: `${theme.spacing(1.5)}`,
        },
      }),
    },
    {
      props: {
        disabled: true,
      },
      style: ({ theme }: StylePropsType<TextFieldProps>) => ({
        [`.${inputBaseClasses.root}`]: {
          border: `${theme.spacing(0.125)} solid ${theme.palette.grey[300]}`,
          borderRadius: theme.spacing(1),
          '& input': {
            color: `${theme.palette.text.secondary}!important`,
            textFillColor: 'initial',
          },

          background: theme.palette.grey[100],
          '&:hover': {
            border: `${theme.spacing(0.125)} solid ${theme.palette.grey[300]}`,
          },
        },
      }),
    },
  ],
};

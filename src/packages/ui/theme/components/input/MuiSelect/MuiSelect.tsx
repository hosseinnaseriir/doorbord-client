import { Components, inputBaseClasses, selectClasses, SelectProps } from '@mui/material';
import { StylePropsType } from '../../../types';


export const MuiSelect: Components['MuiSelect'] = {
  defaultProps: {
    MenuProps: {
      disableRestoreFocus: false,
    },
  },
  styleOverrides: {
    root: ({ theme }: StylePropsType<SelectProps>) => ({
      position: 'relative',
      marginTop: 28,
      color: theme.palette.common.white,
      borderRadius: theme.spacing(1),
      width: '100%',
      padding: 0,
      border: `${theme.spacing(0.125)} solid ${theme.palette.grey[200]}`,
      '&:hover': {
        border: `${theme.spacing(0.125)} solid ${theme.palette.grey[600]}`,
      },
      '&:focus-within': {
        border: `${theme.spacing(0.125)} solid ${theme.palette.primary.main}`,
      },
      '& .MuiSelect-icon': {
        width: 20,
        height: 20,
        position: 'relative',
        top: '-0px',
        left: '-5px',
        fill: theme.palette.common.white
      },
      [`&.${inputBaseClasses.adornedStart}`]: {
        '& svg:nth-of-type(1)': {
          margin: theme.spacing(1),
        },

      },
      [`& .${selectClasses.outlined}`]: {
        padding: `${theme.spacing(1.25)} ${theme.spacing(1.5)}!important`,
        [`&.MuiInputBase-inputAdornedStart`]: {
          paddingLeft: 0 + '!important',
        },
        marginRight: 12,
      },
      fieldset: {
        border: 'none',
        top: -85,
        right: 0,
        ...theme.typography.body2,
        '& span': {
          width: '100%',
          padding: '0'
        },
      },
      legend: {
        '& span': {
          position: 'absolute',
          top: '50%',
          height: '20px',
          opacity: 1,
          transform: 'translateY(-36%)',
          left: 7,
          ...theme.typography.body2,
        },
      },
      [`& .${selectClasses.select}`]: {
        ...theme.typography.body2,
        fontWeight: 500,
      },
    }),
  },
  variants: [
    {
      props: {
        size: 'small',
      },
      style: ({ theme }: StylePropsType<SelectProps>) => ({
        [`& .${selectClasses.outlined}`]: {
          padding: `${theme.spacing(0.88)} ${theme.spacing(1.5)}`,
        },
      }),
    },
    {
      props: {
        error: true,
      },
      style: ({ theme }: StylePropsType<SelectProps>) => ({
        border: `${theme.spacing(0.125)} solid ${theme.palette.error.main}`,
      }),
    },
  ],
};

import { ThemeProvider } from "@mui/material";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import React from "react";
import { theme } from "../../../packages/ui";
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
export const UiProvider: React.FC<Omit<ThemeProviderProps, 'theme'>> = ({ ...props }) => {
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme} {...props} />
        </CacheProvider>
    );
}
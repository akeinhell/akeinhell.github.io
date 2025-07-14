import * as React from 'react';
import type {ThemeOptions} from '@mui/material/styles';
import {createTheme, ThemeProvider} from '@mui/material/styles';

interface AppThemeProps {
 children: React.ReactNode;
 themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
 const {children} = props;
 const theme = React.useMemo(() => {

  return createTheme({
   cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
    cssVarPrefix: 'template',
   },
    defaultColorScheme: 'dark'
  });
 }, []);
 return (
  <ThemeProvider theme={theme} disableTransitionOnChange>
   {children}
  </ThemeProvider>
 );
}

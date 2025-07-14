import * as React from 'react';
import type {ThemeOptions} from '@mui/material/styles';
import {createTheme, ThemeProvider} from '@mui/material/styles';

interface AppThemeProps {
 children: React.ReactNode;
 disableCustomTheme?: boolean;
 themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
 const {children, disableCustomTheme} = props;
 const theme = React.useMemo(() => {
  if (disableCustomTheme) {
   return {};
  }
  return createTheme({
   cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
    cssVarPrefix: 'template',
   },
  });
 }, [disableCustomTheme]);
 if (disableCustomTheme) {
  return <React.Fragment>{children}</React.Fragment>;
 }
 return (
  <ThemeProvider theme={theme} disableTransitionOnChange>
   {children}
  </ThemeProvider>
 );
}

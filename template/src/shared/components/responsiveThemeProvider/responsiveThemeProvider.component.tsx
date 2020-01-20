import React, { FC, Fragment, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import responsiveTheme from '../../../theme/responsiveTheme';
import { WindowListener } from '../windowListener/windowListener.component';

const parseTheme = (theme: object): DefaultTheme => responsiveTheme(theme);

export interface ResponsiveThemeProviderProps {
  theme: object;
  children: React.ReactNode;
}

export const ResponsiveThemeProvider: FC<ResponsiveThemeProviderProps> = ({ theme: themeDefinition, children }) => {
  const [theme, setTheme] = useState(parseTheme(themeDefinition));
  const handleResize = () => setTheme(parseTheme(themeDefinition));

  return (
    <Fragment>
      <WindowListener eventType="resize" throttle={200} onEvent={handleResize} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Fragment>
  );
};

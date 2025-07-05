import React, { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const ThemeModeContext = createContext();

export function useThemeMode() {
    return useContext(ThemeModeContext);
}

export function CustomThemeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark' ? 'dark' : 'light';
    });

    const toggleTheme = () => {
        setMode((prev) => {
            const next = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', next);
            return next;
        });
    };

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode,
                primary: {
                    main: mode === 'dark' ? '#d0bcff' : '#6750a4',
                },
                secondary: {
                    main: mode === 'dark' ? '#fff' : '#d0bcff',
                },
                background: {
                    default: mode === 'dark' ? '#1c1b1f' : '#f8f5ff',
                    paper: mode === 'dark' ? '#23232b' : '#fff',
                },
            },
            shape: {
                borderRadius: 4,
            },
            typography: {
                fontFamily: 'Roboto, Arial, sans-serif',
            },
            components: {
                MuiButton: {
                    styleOverrides: {
                        root: {
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: 4,
                        },
                    },
                },
                MuiTable: {
                    styleOverrides: {
                        root: {
                            borderRadius: 4,
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
                        },
                    },
                },
            },
        }),
        [mode]
    );

    return (
        <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
}

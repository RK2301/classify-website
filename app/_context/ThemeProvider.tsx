'use client'
import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = 'light' | 'dark' | 'system'

type ThemeContextStructure = {
    theme: Theme;
    setNewTheme: (newTheme: Theme) => void
}
const ThemeContext = createContext<ThemeContextStructure | undefined>(undefined)

const ThemeProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'system'

        return localStorage.getItem('theme') as Theme || 'system'
    });

    const setNewTheme = (newTheme: Theme) => {
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {

        if (theme === 'dark' || theme === 'light') {
            document.documentElement.classList.toggle('dark', theme === 'dark')
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .removeEventListener('change', () => { }) // safe no-op
        }
        else {
            //if theme not light or dark then it's based on user System
            const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')

            document.documentElement.classList.toggle('dark', themeMedia.matches)

            const systemThemeListener = (e: MediaQueryListEvent) => {
                console.log(`Listener activated and it and theme media: ${e.matches} `);

                document.documentElement.classList.toggle('dark', e.matches)
            }

            themeMedia.addEventListener('change', systemThemeListener)

            return () => themeMedia.removeEventListener('change', systemThemeListener)
        }
    }, [theme])

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setNewTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

/**this hook can be used to access the current theme of the app */
export const useTheme = () => {
    const val = useContext(ThemeContext)
    if (!val)
        throw new Error('useTheme can\'t be called outside ThemeProvider')
    return val
}

export default ThemeProvider
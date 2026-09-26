import { createContext, useContext, useState, type ReactNode } from 'react';

export type ThemeColor = 'emerald' | 'yellow' | 'blue' | 'purple' | 'pink' | 'orange';

interface ColorTheme {
    name: ThemeColor;
    primary: string;
    primaryDark: string;
    primaryLight: string;
    glow: string;
    tailwind: string;
}

const colorThemes: Record<ThemeColor, ColorTheme> = {
    emerald: {
        name: 'emerald',
        primary: '#34d399',
        primaryDark: '#10b981',
        primaryLight: '#6ee7b7',
        glow: 'rgba(16, 185, 129, 0.6)',
        tailwind: 'emerald-400',
    },
    yellow: {
        name: 'yellow',
        primary: '#fbbf24',
        primaryDark: '#f59e0b',
        primaryLight: '#fcd34d',
        glow: 'rgba(245, 158, 11, 0.6)',
        tailwind: 'yellow-400',
    },
    blue: {
        name: 'blue',
        primary: '#60a5fa',
        primaryDark: '#3b82f6',
        primaryLight: '#93c5fd',
        glow: 'rgba(59, 130, 246, 0.6)',
        tailwind: 'blue-400',
    },
    purple: {
        name: 'purple',
        primary: '#a78bfa',
        primaryDark: '#8b5cf6',
        primaryLight: '#c4b5fd',
        glow: 'rgba(139, 92, 246, 0.6)',
        tailwind: 'purple-400',
    },
    pink: {
        name: 'pink',
        primary: '#f472b6',
        primaryDark: '#ec4899',
        primaryLight: '#f9a8d4',
        glow: 'rgba(236, 72, 153, 0.6)',
        tailwind: 'pink-400',
    },
    orange: {
        name: 'orange',
        primary: '#fb923c',
        primaryDark: '#f97316',
        primaryLight: '#fdba74',
        glow: 'rgba(249, 115, 22, 0.6)',
        tailwind: 'orange-400',
    },
};

interface ColorThemeContextType {
    currentColor: ThemeColor | 'custom';
    theme: ColorTheme;
    setColor: (color: ThemeColor) => void;
    setCustomColor: (hexColor: string) => void;
    allColors: ThemeColor[];
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

function hexToRgba(hex: string, alpha: number = 1): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function createCustomTheme(hexColor: string): ColorTheme {
    return {
        name: 'custom' as ThemeColor,
        primary: hexColor,
        primaryDark: hexColor,
        primaryLight: hexColor,
        glow: hexToRgba(hexColor, 0.6),
        tailwind: 'custom',
    };
}

export function ColorThemeProvider({ children }: { children: ReactNode }) {
    const [currentColor, setCurrentColor] = useState<ThemeColor | 'custom'>('emerald');
    const [customTheme, setCustomTheme] = useState<ColorTheme | null>(null);

    const value: ColorThemeContextType = {
        currentColor,
        theme: currentColor === 'custom' && customTheme ? customTheme : colorThemes[currentColor as ThemeColor],
        setColor: (color: ThemeColor) => {
            setCurrentColor(color);
            setCustomTheme(null);
        },
        setCustomColor: (hexColor: string) => {
            const theme = createCustomTheme(hexColor);
            setCustomTheme(theme);
            setCurrentColor('custom');
        },
        allColors: Object.keys(colorThemes) as ThemeColor[],
    };

    return (
        <ColorThemeContext.Provider value={value}>
            {children}
        </ColorThemeContext.Provider>
    );
}

export function useColorTheme() {
    const context = useContext(ColorThemeContext);
    if (!context) {
        throw new Error('useColorTheme must be used within ColorThemeProvider');
    }
    return context;
}

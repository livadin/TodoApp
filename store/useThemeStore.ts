import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEMES } from '@/constants/ui';

type ThemeMode = "light" | "dark";

interface ThemeStore {
    mode: ThemeMode;
    colors: typeof THEMES.dark;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set, get) => ({
            mode: "dark",
            colors: THEMES.dark,
            toggleTheme: () => {
                const newMode = get().mode === 'light' ? 'dark' : 'light';
                set({ mode: newMode, colors: THEMES[newMode] });
            }
        }),
        {
            name: "theme-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)
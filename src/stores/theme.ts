import { createSignal, createEffect, onMount } from "solid-js";

export type Theme = "light" | "dark" | "system";
export type ChakraColor =
  | "root"
  | "sacral"
  | "solar"
  | "heart"
  | "throat"
  | "third"
  | "crown";

const THEME_STORAGE_KEY = "cha-kra-theme";
const CHAKRA_STORAGE_KEY = "cha-kra-chakra-color";

// Get initial theme from localStorage or default to dark
const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return (stored as Theme) || "dark";
};

// Get initial chakra color or default to root
const getInitialChakra = (): ChakraColor => {
  if (typeof window === "undefined") return "root";
  const stored = localStorage.getItem(CHAKRA_STORAGE_KEY);
  return (stored as ChakraColor) || "root";
};

// Determine if system preference is dark
const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Theme store
const [theme, setTheme] = createSignal<Theme>(getInitialTheme());
const [chakraColor, setChakraColor] =
  createSignal<ChakraColor>(getInitialChakra());
const [effectiveTheme, setEffectiveTheme] = createSignal<"light" | "dark">(
  getSystemTheme(),
);

// Update effective theme based on theme setting
export const updateEffectiveTheme = () => {
  const currentTheme = theme();
  const effective = currentTheme === "system" ? getSystemTheme() : currentTheme;
  setEffectiveTheme(effective);

  // Apply theme class to document
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(effective);
  }
};

// Apply chakra data attribute to document
const applyChakraAttribute = () => {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-chakra", chakraColor());
  }
};

// Initialize theme on mount
export const initializeTheme = () => {
  onMount(() => {
    updateEffectiveTheme();
    applyChakraAttribute();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme() === "system") {
        updateEffectiveTheme();
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleChange);
  });
};

// Theme management functions
export const useTheme = () => {
  createEffect(() => {
    const currentTheme = theme();
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    updateEffectiveTheme();
  });

  createEffect(() => {
    const color = chakraColor();
    localStorage.setItem(CHAKRA_STORAGE_KEY, color);
    applyChakraAttribute();
  });

  return {
    theme,
    setTheme,
    effectiveTheme,
    chakraColor,
    setChakraColor,
  };
};

export const chakraColors: Record<
  ChakraColor,
  { light: string; dark: string }
> = {
  root: { light: "#A63D3D", dark: "#E06060" },
  sacral: { light: "#A5603A", dark: "#E09565" },
  solar: { light: "#806D2A", dark: "#D4B85D" },
  heart: { light: "#4A7A58", dark: "#7DB88A" },
  throat: { light: "#3D5F8F", dark: "#6088BE" },
  third: { light: "#574A78", dark: "#9080B8" },
  crown: { light: "#6F5090", dark: "#A080C8" },
};

export const chakraNames: Record<ChakraColor, string> = {
  root: "Muladhara (Root)",
  sacral: "Svadhisthana (Sacral)",
  solar: "Manipura (Solar Plexus)",
  heart: "Anahata (Heart)",
  throat: "Vishuddha (Throat)",
  third: "Ajna (Third Eye)",
  crown: "Sahasrara (Crown)",
};

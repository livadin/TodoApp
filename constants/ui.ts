export const PALETTE = {
    PRIMARY_ACTION_BUTTON: "#007AFF",
    PRIMARY_RED_BUTTON: "#FF0000",
    SUCCESS: "#4CAF50",
    BACKGROUND_MODAL: "#000000B3",
    TEXT_BUTTON: "#fff", 
}

export const THEMES = {
    dark: {
        primaryBackground: "#131519",
        secondaryBackground: "#1f1f21",
        primaryText: "#fff",
        primaryBorder: "#808080",
        tint: "#fff", 
        ...PALETTE
    },
    light: {
        primaryBackground: "#F2F2F7", 
        secondaryBackground: "#FFFFFF", 
        primaryText: "#000",
        primaryBorder: "#C6C6C8", 
        tint: "#000",
        ...PALETTE
    }
}

import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { StyledText } from "./StyledText";
import { PALETTE } from "@/constants/ui";
import { Ionicons } from "@expo/vector-icons";

type StyleButtonProps = TouchableOpacityProps & {
    label?: string;
    icon?: React.ComponentProps<typeof Ionicons>['name'];
    size?: "default" | "large" | "small";
    variant?: "primary" | "delete";
}

export const StyledButton: React.FC<StyleButtonProps> = ({label, icon, size = "default", variant = "primary", ...props}) => {

    return (
        <TouchableOpacity 
            style={[styles.base, 
                size === "large" ? styles.large : null, 
                size === "small" ? styles.small : null, 
                variant === "delete" ? styles.delete : null]}
            {...props}>
            {label && <StyledText style={{ color: PALETTE.TEXT_BUTTON }}>{label}</StyledText>}
            {icon && <Ionicons name={icon} size={14} color={PALETTE.TEXT_BUTTON} />}
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    base: {
        backgroundColor: PALETTE.PRIMARY_ACTION_BUTTON,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        color: PALETTE.TEXT_BUTTON,
    },
    large: {
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    small: {
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    delete: {
        backgroundColor: PALETTE.PRIMARY_RED_BUTTON,
    },
})

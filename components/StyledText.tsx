import { Text, TextProps } from "react-native";
import { useThemeStore } from "@/store/useThemeStore";

type StyledTextProps = TextProps;

export const StyledText: React.FC<StyledTextProps> = ({ style, ...props }) => {
    const { colors } = useThemeStore();
    return (
        <Text style={[{ color: colors.primaryText }, style]} {...props} />
    )
}
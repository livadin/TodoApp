import React from 'react';
import { TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from '@/store/useThemeStore';
import { PALETTE } from '@/constants/ui';

type StyleCheckboxProps = {
    checked: boolean;
    onCheck: (newValue: boolean) => void;
    style?: ViewStyle;
}

export const StyleCheckbox: React.FC<StyleCheckboxProps> = ({ checked, onCheck, style }) => {
    const { colors } = useThemeStore();
    
    const handleCheck = () => {
        onCheck(!checked);
    }

    return (
       <TouchableOpacity 
           onPress={handleCheck}
           hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
           activeOpacity={0.7}
           style={style}
           accessibilityRole="checkbox"
           accessibilityState={{ checked: checked }}
       >
           <Ionicons 
                name={checked ? "checkmark-circle" : "ellipse-outline"} 
                size={24} 
                color={checked ? PALETTE.SUCCESS : colors.primaryBorder}
            />
       </TouchableOpacity>
    );
}
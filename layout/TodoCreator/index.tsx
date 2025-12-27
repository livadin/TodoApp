import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { StyledButton } from "@/components/StyledButton";

import { Todo } from "@/types/todo";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/store/useThemeStore";
import { PALETTE } from "@/constants/ui";

type TodoCreatorProps = {
    onAddTodo: (title: Todo["title"]) => void;
}

export const TodoCreator: React.FC<TodoCreatorProps> = ({ onAddTodo }) => {
    const [text, setText] = useState("");
    const { t } = useTranslation();
    const { colors } = useThemeStore();

    const handlePress = () => {
        if (text.trim()) {
            onAddTodo(text);
            setText("");
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.secondaryBackground }]}>
            <TextInput
                style={[styles.input, { color: colors.primaryText }]}
                placeholder={t('what_to_do')}
                placeholderTextColor={colors.primaryBorder}
                value={text}
                onChangeText={setText}
                autoCapitalize="sentences"
                autoCorrect={false} 
            />
            <StyledButton
                label={t('add')}
                onPress={handlePress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 10,
        borderRadius: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: PALETTE.TEXT_BUTTON
    }
});
import React from 'react';
import { StyleSheet, View } from "react-native";
import { StyledButton } from "@/components/StyledButton";
import { StyleCheckbox } from "@/components/StyleCheckbox";
import { StyledText } from "@/components/StyledText";
import { useThemeStore } from '@/store/useThemeStore';

type TodoItemProps = {
    id: string;
    title: string;
    isCompleted: boolean;
    onToggle: () => void;
    onDelete: () => void;
    onEdit: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
    title, 
    isCompleted, 
    onToggle, 
    onDelete, 
    onEdit
}) => {
    const { colors } = useThemeStore();
    return (
        <View style={[styles.container, { backgroundColor: colors.secondaryBackground }]}>
            <View style={styles.contentContainer}>
                <StyleCheckbox checked={isCompleted} onCheck={onToggle}/>
                
                <StyledText 
                    style={[
                        styles.text,
                        { textDecorationLine: isCompleted ? "line-through" : "none" },
                        { color: isCompleted ? colors.primaryBorder : colors.primaryText }
                    ]}
                >
                    {title}
                </StyledText>
            </View>

            <View style={styles.controlsContainer}>
                <StyledButton icon="pencil" size="small" onPress={onEdit}/>
                <StyledButton icon="trash" size="small" variant="delete" onPress={onDelete}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        marginVertical: 6, 
        borderRadius: 12,
    },
    contentContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingRight: 10,
    },
    text: {
        flex: 1,
    },
    controlsContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    }
});
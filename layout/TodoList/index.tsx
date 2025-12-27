import { FlatList, View, StyleSheet, Text, Image } from "react-native";
import { Todo } from "@/types/todo";
import { TodoItem } from "../TodoItem";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/store/useThemeStore";

type TodoListProps = {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
    const { t } = useTranslation();
    const { colors } = useThemeStore();

    return (
        <View style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
            <FlatList 
                data={todos}
                keyExtractor={(todo) => todo.id}
                
                contentContainerStyle={[
                    styles.listContent, 
                    todos.length === 0 && styles.contentContainerFilled 
                ]}
                
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Image 
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7486/7486754.png' }} 
                            style={styles.image}
                            resizeMode="contain"
                        />
                        
                        <Text style={[styles.emptyTitle, { color: colors.primaryText }]}>{t('list_empty')}</Text>  
                        <Text style={[styles.emptySubTitle, { color: colors.primaryText }]}>{t('add_first_task')}</Text>
                    </View>
                }

                renderItem={({ item }) => (
                    <TodoItem 
                        id={item.id}
                        title={item.title} 
                        isCompleted={item.isCompleted}
                        onToggle={() => onToggle(item.id)}
                        onDelete={() => onDelete(item.id)}
                        onEdit={() => onEdit(item.id)}
                    />
                )}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    contentContainerFilled: {
        flexGrow: 1, 
        justifyContent: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
        opacity: 0.5,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    emptySubTitle: {
        fontSize: 16,
        marginTop: 5,
    }
});
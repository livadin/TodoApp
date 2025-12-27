import { Header } from "@/layout/Header";
import { TodoList } from "@/layout/TodoList";
import { TodoCreator } from "@/layout/TodoCreator";
import { EditModal } from "@/components/EditModal";
import { TrashModal } from "@/components/TrashModal"; 
import { useTodoStore } from "@/store/useTodoStore";
import { useState } from "react";
import { 
    StatusBar, 
    StyleSheet, 
    View, 
    KeyboardAvoidingView, 
    Platform 
} from "react-native";
import { useThemeStore } from "@/store/useThemeStore";


export default function Index() {
    const { 
        todos, 
        addTodo, 
        toggleTodo, 
        moveToTrash,
        editTodo,
        toggleTrashTodo
    } = useTodoStore();

    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [isTrashVisible, setIsTrashVisible] = useState(false);

    const startEditing = (id: string) => {
        setEditingTodoId(id);
    };

    const saveEditedTodo = (newTitle: string) => {
        if (editingTodoId) {
            editTodo(editingTodoId, newTitle);
            setEditingTodoId(null);
        }
    };

    const todoToEdit = todos.find(t => t.id === editingTodoId);
    const completedTodos = todos.filter(todo => todo.isCompleted).length;
    const { colors, mode } = useThemeStore();

    return (
        <View style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
            
            <StatusBar barStyle={mode === 'dark' ? "light-content" : "dark-content"} 
                backgroundColor={colors.primaryBackground}/>
        
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <Header 
                    totalTodos={todos.length} 
                    completedTodos={completedTodos}
                    onOpenTrash={() => setIsTrashVisible(true)}
                />
            
                <TodoList 
                    todos={todos} 
                    onToggle={toggleTodo}
                    onDelete={moveToTrash}
                    onEdit={startEditing}
                />

                <View style={styles.footer }>
                    <TodoCreator onAddTodo={addTodo} />
                </View>
            </KeyboardAvoidingView>

            <EditModal 
                visible={!!editingTodoId}
                initialTitle={todoToEdit?.title || ""}
                onSave={saveEditedTodo}
                onClose={() => setEditingTodoId(null)}
            />
            
            <TrashModal 
                visible={isTrashVisible}
                onClose={() => setIsTrashVisible(false)} 
                onCheck={toggleTrashTodo} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        padding: 20,
    }
})
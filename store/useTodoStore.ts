import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '@/types/todo';

interface TodoState {
    todos: Todo[];
    trash: Todo[];
    
    addTodo: (title: string) => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, newTitle: string) => void;
    moveToTrash: (id: string) => void;
    restoreTodo: (id: string) => void;
    deleteFromTrash: (id: string) => void;
    emptyTrash: () => void;
    toggleTrashTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({
            todos: [],
            trash: [],

            addTodo: (title) => set((state) => ({
                todos: [...state.todos, { id: Date.now().toString(), title, isCompleted: false }]
            })),

            toggleTodo: (id) => set((state) => ({
                todos: state.todos.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)
            })),

            editTodo: (id, newTitle) => set((state) => ({
                todos: state.todos.map(t => t.id === id ? { ...t, title: newTitle } : t)
            })),

            moveToTrash: (id) => set((state) => {
                const todoToMove = state.todos.find(t => t.id === id);
                if (!todoToMove) return state;

                return {
                    todos: state.todos.filter(t => t.id !== id),
                    trash: [
                        { ...todoToMove, deletedAt: new Date().toISOString() }, 
                        ...state.trash
                    ]
                };
            }),

            restoreTodo: (id) => set((state) => {
                const todoToRestore = state.trash.find(t => t.id === id);
                if (!todoToRestore) return state;

                const { deletedAt, ...cleanTodo } = todoToRestore;

                return {
                    trash: state.trash.filter(t => t.id !== id),
                    todos: [...state.todos, cleanTodo]
                };
            }),

            deleteFromTrash: (id) => set((state) => ({
                trash: state.trash.filter(t => t.id !== id)
            })),
            
            emptyTrash: () => set({ trash: [] }),

            toggleTrashTodo: (id) => set((state) => ({
                trash: state.trash.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)
            })),
        }),
        
        {
            name: 'todo-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
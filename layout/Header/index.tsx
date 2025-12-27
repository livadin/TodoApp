import { StyledText } from "@/components/StyledText";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeStore } from "@/store/useThemeStore";

type HeaderProps = {
    totalTodos: number;
    completedTodos: number;
    onOpenTrash: () => void;
}

export const Header: React.FC<HeaderProps> = ({totalTodos, completedTodos, onOpenTrash}) => {
    const { t, i18n } = useTranslation();

    const { colors, mode, toggleTheme } = useThemeStore();

    const toggleLanguage = async () => {
        const newLang = i18n.language === 'uk' ? 'en' : 'uk';
        await i18n.changeLanguage(newLang);
        await AsyncStorage.setItem('language', newLang);
    };

    const currentDate = new Date().toLocaleDateString(
        i18n.language === 'uk' ? 'uk-UA' : 'en-US',
        { 
            day: 'numeric', 
            month: 'long', 
            weekday: 'long' 
        }
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
            <View style={styles.topRow}>
                <View>
                    {/* Динамический цвет текста */}
                    <StyledText style={[styles.title, { color: colors.primaryText }]}>{t('todo_app')}</StyledText>
                    <StyledText style={[styles.date, { color: colors.primaryBorder }]}>
                        {currentDate.charAt(0).toUpperCase() + currentDate.slice(1)}
                    </StyledText>
                </View>
                
                <View style={styles.buttonsRow}>
                    {/* Кнопка темы */}
                    <TouchableOpacity onPress={toggleTheme} style={[styles.iconButton, { borderColor: colors.primaryBorder }]}>
                        <Ionicons 
                            name={mode === 'dark' ? "sunny-outline" : "moon-outline"} 
                            size={20} 
                            color={colors.primaryText} 
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleLanguage} style={[styles.langButton, { borderColor: colors.primaryBorder }]}>
                        <StyledText style={[styles.langText, { color: colors.primaryText }]}>{t('switch_lang')}</StyledText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onOpenTrash} style={[styles.trashButton, { borderColor: colors.primaryBorder }]}>
                        <Ionicons name="trash-bin-outline" size={24} color={colors.primaryText} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <StyledText style={styles.stats}>{t('completed')} {completedTodos}/{totalTodos}</StyledText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    date: {
        marginTop: 4
    },
    stats: {
        fontSize: 14,
    },
    trashButton: {
        padding: 4,
        borderRadius: 8,
    },
    langButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
    },
    langText: {
        fontWeight: 'bold',
        fontSize: 12
    },
    iconButton: {
        padding: 4,
        borderRadius: 8,
    },
});
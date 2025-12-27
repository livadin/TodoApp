import React, { useMemo } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import { StyledText } from './StyledText';
import { useThemeStore } from '@/store/useThemeStore';
import { useTodoStore } from '@/store/useTodoStore';
import { Ionicons } from '@expo/vector-icons';
import { StyleCheckbox } from './StyleCheckbox';
import { useTranslation } from 'react-i18next';
import { PALETTE } from '@/constants/ui';

type TrashModalProps = {
    visible: boolean;
    onClose: () => void;
    onCheck: (id: string) => void; 
}

export const TrashModal: React.FC<TrashModalProps> = ({ visible, onClose, onCheck }) => {
    const { trash, restoreTodo, deleteFromTrash, emptyTrash } = useTodoStore();
    const { t } = useTranslation();
    const { colors } = useThemeStore();

    const sections = useMemo(() => {
        const grouped: { [key: string]: typeof trash } = {};

        trash.forEach((item) => {
            const date = item.deletedAt 
                ? new Date(item.deletedAt).toLocaleDateString('uk-UA') 
                : t('earlier'); 

            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(item);
        });

        return Object.keys(grouped).map(date => ({
            title: date,
            data: grouped[date]
        }));
    }, [trash]);

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <View style={[styles.container, { backgroundColor: colors.primaryBackground}]}>
                <View style={[styles.header, { backgroundColor: colors.secondaryBackground}]}>
                    <StyledText style={styles.title}>{t('trash')} ({trash.length})</StyledText>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={28} color={colors.primaryText} />
                    </TouchableOpacity>
                </View>

                {trash.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="trash-outline" size={64} color={colors.primaryBorder} />
                        <StyledText style={[styles.emptyText, { color: colors.primaryBorder }]}>{t('empty_trash')}</StyledText>
                    </View>
                ) : (
                    <>
                        <SectionList
                            sections={sections}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            stickySectionHeadersEnabled={false}
                            
                            renderSectionHeader={({ section: { title } }) => (
                                <View style={[styles.sectionHeader, { backgroundColor: colors.secondaryBackground }]}>
                                    <StyledText style={[styles.sectionHeaderText, { color: colors.primaryText }]}>{title}</StyledText>
                                </View>
                            )}
                            renderItem={({ item }) => (
                                <View style={styles.itemWrapper}>
                                    <View style={[styles.itemContainer, { backgroundColor: colors.secondaryBackground }]}>
                                        <View style={{ marginRight: 10 }}>
                                            <StyleCheckbox 
                                                checked={item.isCompleted} 
                                                onCheck={() => onCheck(item.id)}
                                            />
                                        </View>
                                        
                                        <StyledText 
                                            style={[styles.itemText, { color: colors.primaryBorder }]} 
                                            numberOfLines={1} 
                                            ellipsizeMode="tail"
                                        >
                                            {item.title}
                                        </StyledText>

                                        <View style={styles.actions}>
                                            <TouchableOpacity onPress={() => restoreTodo(item.id)} style={styles.actionBtn}>
                                                <Ionicons name="refresh" size={20} color={PALETTE.SUCCESS} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => deleteFromTrash(item.id)} style={styles.actionBtn}>
                                                <Ionicons name="close-circle" size={20} color={PALETTE.PRIMARY_RED_BUTTON} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                         <TouchableOpacity style={styles.clearAllBtn} onPress={emptyTrash}>
                            <StyledText style={{color: 'white', fontWeight: 'bold'}}>{t('clear_trash')}</StyledText>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    emptyText: {
        fontSize: 16,
    },
    sectionHeader: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        alignSelf: 'center', 
        marginTop: 15,
        marginBottom: 5,
        borderRadius: 8,
    },
    sectionHeaderText: {
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    },
    itemWrapper: {
        paddingHorizontal: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        padding: 15,
        borderRadius: 10,
        marginBottom: 8,
    },
    itemText: {
        flex: 1, 
        textDecorationLine: 'line-through',
        marginRight: 10, 
    },
    actions: {
        flexDirection: 'row',
        gap: 5, 
    },
    actionBtn: {
        padding: 5,
    },
    clearAllBtn: {
        backgroundColor: PALETTE.PRIMARY_RED_BUTTON,
        margin: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    }
});
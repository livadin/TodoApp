import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, StyleSheet } from 'react-native';
import { StyledButton } from './StyledButton';
import { StyledText } from './StyledText';
import { PALETTE } from '@/constants/ui';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/useThemeStore';

type EditModalProps = {
    visible: boolean;
    initialTitle: string;
    onSave: (newTitle: string) => void;
    onClose: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({ visible, initialTitle, onSave, onClose }) => {
    const [text, setText] = useState(initialTitle);
    const { colors } = useThemeStore();

    useEffect(() => {
        setText(initialTitle);
    }, [initialTitle, visible]);

    const handleSave = () => {
        if (text.trim()) {
            onSave(text);
            setText("");
        }
    };

    const { t } = useTranslation();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.modalContent, { backgroundColor: colors.secondaryBackground, borderColor: colors.primaryBorder }]}>
                    <StyledText style={styles.title}>{t('edit_task')}</StyledText>
                    
                    <TextInput
                        style={[styles.input, { backgroundColor: colors.primaryBackground, color: colors.primaryText, borderColor: colors.primaryBorder }]}
                        value={text}
                        onChangeText={setText}
                        autoFocus
                    />

                    <View style={styles.buttons}>
                        <StyledButton 
                            label={t('cancel')} 
                            onPress={onClose} 
                            variant="delete"
                            size="small"
                        />
                        <StyledButton 
                            label={t('save')} 
                            onPress={handleSave} 
                            size="small"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: PALETTE.BACKGROUND_MODAL,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        width: '100%',
        borderRadius: 14,
        padding: 20,
        gap: 15,
        borderWidth: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    }
});
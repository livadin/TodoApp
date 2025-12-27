import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
  en: {
    translation: {
      "todo_app": "Todo List",
      "completed": "Completed",
      "list_empty": "The list is empty",
      "add_first_task": "Add your first task!",
      "what_to_do": "What needs to be done?",
      "add": "Add",
      "edit_task": "Edit Task",
      "cancel": "Cancel",
      "save": "Save",
      "trash": "Trash",
      "trash_empty": "Trash is empty",
      "clear_trash": "Empty Trash",
      "earlier": "Earlier",
      "settings": "Language",
      "switch_lang": "UA"
    }
  },
  uk: {
    translation: {
      "todo_app": "Список справ",
      "completed": "Виконано",
      "list_empty": "Список порожній",
      "add_first_task": "Додайте свою першу задачу!",
      "what_to_do": "Що треба зробити?",
      "add": "Додати",
      "edit_task": "Редагувати задачу",
      "cancel": "Скасувати",
      "save": "Зберегти",
      "trash": "Кошик",
      "trash_empty": "Кошик порожній",
      "clear_trash": "Очистити кошик",
      "earlier": "Раніше",
      "settings": "Мова",
      "switch_lang": "EN"
    }
  }
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('language');

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageCode;
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLanguage || 'uk',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
};

initI18n();

export default i18n;
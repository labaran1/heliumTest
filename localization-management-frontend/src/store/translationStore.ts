import {create} from 'zustand';
import { TranslationStore, TranslationFilter,  } from "../types/translation";



const initialFilter: TranslationFilter = {
    search: '',
    category: '',
    language: '',
    tags: ["home", "about", "contact", "privacy", "terms"],
  };
  
  export const useTranslationStore = create<TranslationStore>((set,get) => ({
    keys: [],
    filter: initialFilter,
    selectedLanguages: [],
    actions: {
      addTranslationKey: (key) =>
        set((state) => ({
          keys: [...state.keys, key],
        })),
  
      addTagToKey: (keyId, tag) =>
        set((state) => ({
          keys: state.keys.map((k) =>
            k.id === keyId
              ? {
                  ...k,
                  tags: [...new Set([...(k.tags || []), tag])],
                }
              : k
          ),
        })),
  
        toggleLanguage: (language) => {
            const { selectedLanguages, keys } = get();
            const exists = selectedLanguages.some((l) => l.code === language.code);
          
            if (exists) {
              set({
                selectedLanguages: selectedLanguages.filter((l) => l.code !== language.code),
                keys: keys.map((key) => {
                  const updatedTranslations = { ...key.translations };
                  delete updatedTranslations[language.code];
                  return {
                    ...key,
                    translations: updatedTranslations,
                  };
                }),
              });
            } else {
              // ADD language to selectedLanguages and each TranslationKey.translations
              set({
                selectedLanguages: [...selectedLanguages, language],
                keys: keys.map((key) => ({
                  ...key,
                  translations: {
                    ...key.translations,
                    [language.code]: {
                      value: '',
                      updatedBy: '',
                    },
                  },
                })),
              });
            }
        },
        setFilter: (partial) => {
             set((s) => ({ filter: { ...s.filter, ...partial } }))
        }
       
  
    },
  }));
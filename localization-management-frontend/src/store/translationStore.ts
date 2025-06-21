import {create} from 'zustand';
import { TranslationStore, TranslationFilter } from "../types/translation";



const initialFilter: TranslationFilter = {
    search: '',
    category: '',
    language: ''
  };
  
  export const useTranslationStore = create<TranslationStore>((set) => ({
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
  
     
  
    },
  }));
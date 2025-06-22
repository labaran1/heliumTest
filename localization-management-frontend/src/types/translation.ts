import { Project } from "./projects";
export type LanguageCode = 'en' | 'fr' | 'es' | 'de' | 'zh' | 'ar' | string;

export interface LanguageMap {
    code: LanguageCode;
    label: string;
    flag?: string;
};

export interface TranslationValue {
  value?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface TranslationKey {
  id: string;
  key: {
    language: LanguageMap;
    value: string;
  };
    category: string;
    project: Project;
  description?: string;
  tags?: string[];
  translations: {
    [language in LanguageCode]: TranslationValue;
  };
}

export interface TranslationFilter {
  search: string;
  category: string;
    language: string;
    tags: string[];
}

export interface TranslationActions {
    addTranslationKey: (key: TranslationKey) => void;
    updateTranslationKey: (key: Partial<TranslationKey>) => void;
    removeTranslationKey: (keyId: string) => void;
    addTagToKey: (keyId: string, tag: string) => void;
    toggleLanguage: (language: LanguageMap) => void;
    setFilter: (filter: Partial<TranslationFilter>) => void;

}

export interface TranslationStore {
  keys: TranslationKey[];
  filter: TranslationFilter;
  selectedLanguages: LanguageMap[];
  actions: TranslationActions;
}

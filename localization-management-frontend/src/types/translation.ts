export type LanguageCode = 'en' | 'fr' | 'es' | 'de' | 'zh' | 'ar' | string;

export type LanguageMap = {
  [code in LanguageCode]?: string;
};

export interface TranslationValue {
  value: string;
  updatedAt?: string;
  updatedBy: string;
}

export interface TranslationKey {
  id: string;
  key: {
    language: LanguageMap;
    value: string;
  };
  category: string;
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
}

export interface TranslationActions {
  addTranslationKey: (key: TranslationKey) => void;
  addTag: (tag: string) => void;
}

export interface TranslationStore {
  keys: TranslationKey[];
  filter: TranslationFilter;
  selectedLanguages: string[];
  actions: TranslationActions;
}

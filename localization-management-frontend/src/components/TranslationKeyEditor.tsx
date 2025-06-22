'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoAdd, IoClose } from 'react-icons/io5';
import { useTranslationStore } from '../store/translationStore';
import {
    LanguageCode,
    TranslationKey,
} from '../types/translation';
import { useShallow } from "zustand/shallow";

interface Props {
    existingKey?: TranslationKey;
    onClose: () => void;
}

export default function TranslationKeyEditor({ existingKey, onClose }: Props) {
    const isNew = !existingKey;
    const { selectedLanguages, actions } = useTranslationStore(useShallow((s) => ({
        selectedLanguages: s.selectedLanguages,
        actions: s.actions,
    })));

    // form state
    const [keyValue, setKeyValue] = useState(existingKey?.key.value ?? '');
    const [description, setDescription] = useState(existingKey?.description ?? '');
    const [tags, setTags] = useState<string[]>(existingKey?.tags ?? []);
    const [tagInput, setTagInput] = useState('');
    const [translations, setTranslations] = useState<
        Record<LanguageCode, string>
    >({});

    useEffect(() => {
        const initial: Record<LanguageCode, string> = {};
        for (const lang of selectedLanguages) {
            initial[lang.code] =
                existingKey?.translations[lang.code]?.value ?? '';
        }
        setTranslations(initial);
    }, [existingKey, selectedLanguages]);

    const addTag = () => {
        const t = tagInput.trim();
        if (t && !tags.includes(t)) {
            setTags([...tags, t]);
        }
        setTagInput('');
    };

    const removeTag = (t: string) => {
        setTags(tags.filter((x) => x !== t));
    };

    const onSave = () => {
        const txs: TranslationKey['translations'] = {};
        const now = new Date().toISOString();
        for (const lang of selectedLanguages) {
            txs[lang.code] = {
                value: translations[lang.code] || '',
                updatedAt: now,
                updatedBy: existingKey
                    ? existingKey.translations[lang.code]?.updatedBy || ''
                    : '',
            };
        }

        const newKey: TranslationKey = {
            id: existingKey?.id ?? uuidv4(),
            key: {
                language: selectedLanguages[0] ?? { code: 'en', label: 'English' },
                value: keyValue,
            },
            category: existingKey?.category ?? '',
            project: existingKey?.project ?? { id: '', name: '' },
            description,
            tags,
            translations: txs,
        };

        if (isNew) {
            actions.addTranslationKey(newKey);
        } else {
            actions.updateTranslationKey(newKey);
        }
        onClose();
    };

    return (
        <div
            style={{
                backgroundColor: 'white',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '16px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '500' }}>
                    {isNew ? 'Add Translation Key' : 'Edit Translation Key'}
                </h3>
                <button onClick={onClose}>
                    <IoClose size={20} />
                </button>
            </div>

            {/* Key */}
            <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Translation Key</label>
                <input
                    type="text"
                    style={{
                        width: '100%',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        padding: '8px',
                    }}
                    value={keyValue}
                    onChange={(e) => setKeyValue(e.target.value)}
                />
            </div>

            {/* Description */}
            <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Description</label>
                <textarea
                    style={{
                        width: '100%',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        padding: '8px',
                    }}
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* Tags */}
            <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Tags</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    {tags.map((t) => (
                        <span
                            key={t}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                backgroundColor: '#e5e7eb',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '14px',
                            }}
                        >
                            {t}
                            <IoClose
                                size={14}
                                style={{ cursor: 'pointer' }}
                                onClick={() => removeTag(t)}
                            />
                        </span>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="text"
                        style={{
                            flex: '1',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            padding: '8px',
                        }}
                        placeholder="Add tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button
                        style={{
                            padding: '8px 12px',
                            backgroundColor: 'black',
                            color: 'white',
                            borderRadius: '4px',
                        }}
                        onClick={addTag}
                    >
                        <IoAdd />
                    </button>
                </div>
            </div>

            {/* Translations */}
            <div>
                <h4 style={{ marginBottom: '8px', fontWeight: '500' }}>Translations</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedLanguages.map((lang) => (
                        <div key={lang.code}>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                                {lang.flag} {lang.label}
                            </label>
                            <input
                                type="text"
                                style={{
                                    width: '100%',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    padding: '8px',
                                }}
                                value={translations[lang.code] || ''}
                                onChange={(e) =>
                                    setTranslations({
                                        ...translations,
                                        [lang.code]: e.target.value,
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '16px' }}>
                <button
                    style={{
                        padding: '8px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                    }}
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    style={{
                        padding: '8px 16px',
                        backgroundColor: 'black',
                        color: 'white',
                        borderRadius: '4px',
                    }}
                    onClick={onSave}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
'use client';

import { useState } from 'react';
import { IoPencil, IoTrash, IoAdd } from 'react-icons/io5';
import { useTranslationStore } from '../store/translationStore';
import AddTranslationKeyModal from './AddTranslationKeyModal';
import TranslationKeyEditor from './TranslationKeyEditor';
import { useShallow } from "zustand/shallow";

export default function TranslationKeyList() {
    const { keys, actions } = useTranslationStore(useShallow((s) => ({
        keys: s.keys,
        actions: s.actions,
    })));
    const [editingId, setEditingId] = useState<string | null>(null);
    const [addOpen, setAddOpen] = useState(false);

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500' }}>
                    {keys.length} translation key{keys.length !== 1 ? 's' : ''}
                </span>
                <button
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 12px',
                        backgroundColor: 'black',
                        color: 'white',
                        borderRadius: '4px',
                    }}
                    onClick={() => setAddOpen(true)}
                >
                    <IoAdd /> Add Key
                </button>
            </div>

            {/* Add‐Key Modal */}
            <AddTranslationKeyModal
                open={addOpen}
                onClose={() => setAddOpen(false)}
            />

            {/* Inline‐edit rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {keys.map((k) =>
                    editingId === k.id ? (
                        <TranslationKeyEditor
                            key={k.id}
                            existingKey={k}
                            onClose={() => setEditingId(null)}
                        />
                    ) : (
                        <div
                            key={k.id}
                            style={{
                                backgroundColor: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                padding: '16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: '500' }}>{k.key.value}</div>
                                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                    {k.description}
                                </div>
                                <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {k.tags?.map((t) => (
                                        <span
                                            key={t}
                                            style={{
                                                fontSize: '12px',
                                                backgroundColor: '#e5e7eb',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => setEditingId(k.id)}>
                                    <IoPencil size={20} />
                                </button>
                                <button onClick={() => actions.removeTranslationKey(k.id)}>
                                    <IoTrash size={20} style={{ color: '#dc2626' }} />
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
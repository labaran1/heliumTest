'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { IoClose, IoAdd } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import { useShallow } from 'zustand/shallow';

import { useTranslationStore } from '../store/translationStore';
import { LanguageCode, TranslationKey } from '../types/translation';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddTranslationKeyModal({ open, onClose }: Props) {
  const { selectedLanguages, actions } = useTranslationStore(
    useShallow((s) => ({
      selectedLanguages: s.selectedLanguages,
      actions: s.actions,
    }))
  );

  // form state
  const [keyValue, setKeyValue] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [translations, setTranslations] = useState<
    Record<LanguageCode, string>
  >({});

  // init translations when modal opens
  useEffect(() => {
    if (!open) return;
    // clear fields
    setKeyValue('');
    setDescription('');
    setTags([]);
    setTagInput('');
    // init empty translation per selected language
    const tx: Record<LanguageCode, string> = {};
    selectedLanguages.forEach((lang) => {
      tx[lang.code] = '';
    });
    setTranslations(tx);
  }, [open, selectedLanguages]);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput('');
  };

  const removeTag = (t: string) => {
    setTags((prev) => prev.filter((x) => x !== t));
  };

  const onSave = () => {
    const now = new Date().toISOString();
    const txs: TranslationKey['translations'] = {};
    selectedLanguages.forEach((lang) => {
      txs[lang.code] = {
        value: translations[lang.code],
        updatedAt: now,
        updatedBy: '', 
      };
    });

    const newKey: TranslationKey = {
      id: uuidv4(),
      key: {
        language: selectedLanguages[0] ?? { code: 'en', label: 'English' },
        value: keyValue,
      },
      category: '',
      project: { id: '', name: '' },
      description,
      tags,
      translations: txs,
    };

    actions.addTranslationKey(newKey);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Add Translation Key
        <IconButton onClick={onClose} size='small' style={{cursor:'pointer'}}>
          <IoClose />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
      >
        {/* Translation Key */}
        <TextField
          required
          fullWidth
          label='Translation Key'
          placeholder='e.g., common.welcome'
          value={keyValue}
          onChange={(e) => setKeyValue(e.target.value)}
        />

        {/* Description */}
        <TextField
          fullWidth
          multiline
          minRows={2}
          label='Description'
          placeholder='Optional description for this translation key'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Tags */}
        <div>
          <label  style={{display:'block', fontSize:'14px'}}>Tags</label>
          <div style={{display:'flex', flexWrap:'wrap', marginBottom:'5px', gap:'4px'}}>
            {tags.map((t) => (
              <span
                key={t}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#e0e0e0',
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
          <div  style={{display:'flex', gap:'4px'}}>
            <TextField
              fullWidth
              size='small'
              placeholder='Add tag'
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <Button
              variant='contained'
              size='large'
              onClick={addTag}
              style={{ background: '#000', fontSize:'20px' }}
            >
              <IoAdd />
            </Button>
          </div>
        </div>

        {/* Translations */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            Translations
          </label>
          <div style={{display:'flex', gap:'1rem', flexDirection:'column'}}>
            {selectedLanguages.map((lang) => (
              <TextField
                key={lang.code}
                fullWidth
                size='small'
                label={`${lang.flag ?? ''} ${lang.label}`}
                value={translations[lang.code] || ''}
                onChange={(e) =>
                  setTranslations({
                    ...translations,
                    [lang.code]: e.target.value,
                  })
                }
              />
            ))}
          </div>
        </div>
      </DialogContent>

      <DialogActions  style={{padding:'8px'}}>
              <Button onClick={onClose} 
               style={{ color:'#000', padding:'4px', border:'1px solid'}}
              >
          Cancel
        </Button>
        <Button
          variant='contained'
          startIcon={<IoAdd />}
          onClick={onSave}
          disabled={!keyValue.trim()}
         style={{background:'#000', color:'#fff', padding:'4px', cursor:'pointer'}}
      
        >
          Add Translation Key
        </Button>
      </DialogActions>
    </Dialog>
  );
}

'use client';

import {
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Chip,
} from '@mui/material';
import { MdArrowDropDown, MdClose } from 'react-icons/md';
import { HiCheck as CheckIcon } from "react-icons/hi";
import { useTranslationStore } from "../store/translationStore";
import { AVAILABLE_LANGUAGES } from '../constants/languages';
import React from 'react';

export const LanguageSelector: React.FC = () => {
  const selectedLanguages = useTranslationStore((s) => s.selectedLanguages);
  const toggleLanguage = useTranslationStore((s) => s.actions.toggleLanguage);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleToggle = (lang: typeof AVAILABLE_LANGUAGES[number]) => {
    toggleLanguage(lang); // LanguageMap = { code, label, flag }
  };

  return (
    <Box >
      {/* Trigger button */}
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          gap: 0.5,
        }}
      >
        <Typography variant="body2">
          Languages ({selectedLanguages.length})
        </Typography>
        <MdArrowDropDown size={20} />
      </Box>

      {/* Dropdown */}
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} >
        {AVAILABLE_LANGUAGES.map((lang) => {
          const isSelected = selectedLanguages.some((l) => l.code === lang.code);
          return (
            <MenuItem key={lang.code} onClick={() => handleToggle(lang)}>
              <ListItemIcon>
                <span style={{ fontSize: 20 }}>{lang.flag}</span>
              </ListItemIcon>
              <ListItemText>{lang.label}</ListItemText>
              {isSelected && <CheckIcon fontSize="small" />}
            </MenuItem>
          );
        })}
      </Menu>

      {/* Selected Chips */}
      <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {selectedLanguages.map((lang) => (
          <Chip
            key={lang.code}
            avatar={
              <Avatar sx={{ width: 24, height: 24 }}>
                {lang.flag ?? '🌐'}
              </Avatar>
            }
            label={lang.label}
            onDelete={() => handleToggle(lang)}
            deleteIcon={
              <IconButton size="small">
                <MdClose size={16} />
              </IconButton>
            }
          />
        ))}
      </Box>
    </Box>
  );
};

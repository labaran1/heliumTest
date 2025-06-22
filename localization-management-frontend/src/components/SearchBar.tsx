'use client';

import { useState, useMemo } from 'react';
import { useTranslationStore } from '../store/translationStore';
import { TextField, IconButton, Menu, MenuItem, Checkbox, Divider } from '@mui/material';
import { CiSearch as SearchIcon } from "react-icons/ci";

import { IoFilter } from 'react-icons/io5';

export default function SearchBar() {
  const filter = useTranslationStore((s) => s.filter);
  const setFilter = useTranslationStore((s) => s.actions.setFilter);

  const allTags = useMemo(() => {
    const flat = filter.tags.flatMap((k) => k || []);
    return Array.from(new Set(flat));
  }, [filter.tags]);

  // tags‐menu state
  const [anchorEl, setAnchorEl] = useState<null|HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter({ search: e.target.value });

  const onFilterButtonClick = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);

  const onMenuClose = () => setAnchorEl(null);

  const toggleTag = () => {
  
    // setFilter();
  };

  return (
      <div  style={{ display: 'flex', alignItems: 'center', gap:'1rem'}}>
      <TextField
        size="small"
        placeholder="Search translation keys..."
        value={filter.search}
        onChange={onSearchChange}
        InputProps={{
          startAdornment: <SearchIcon fontSize="large" style={{marginRight:'2'}} />,
        }}
        style={{maxWidth:'500px', width:'500px', }}
      />

      <IconButton
        size="small"
        onClick={onFilterButtonClick}
        className="border rounded"
      >
        <IoFilter />
        <span style={{marginLeft:'3px', fontSize:'14px'}}>Tags</span>
      </IconButton>

      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onMenuClose}
        PaperProps={{ style: { minWidth: 200 } }}
      >
        <div  style={{paddingLeft:'1rem', paddingRight:'2px'}}>Filter by tags</div>
        <Divider />
        {allTags.length === 0 && (
          <MenuItem disabled>No tags found</MenuItem>
        )}
        {allTags.map((tag) => (
          <MenuItem
            key={tag}
            onClick={() => toggleTag()}
            dense
          >
            <Checkbox
              size="small"
            />
            {tag}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
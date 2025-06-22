'use client'
import { useState } from "react";
import { useProjectStore } from "../store/projectStore";
import { useShallow } from "zustand/shallow";
import { Project } from "../types/projects";
import { useProjects } from "../hooks/useProjects";
import {
    Menu,
    MenuItem,
    ListItemText,
    Typography,
  Button,
  CircularProgress
} from '@mui/material';
 import { CiFolderOn } from "react-icons/ci";
 import { HiChevronDown } from 'react-icons/hi';
  
  export const ProjectSelector: React.FC = () => {
    const { selectedProject, actions } = useProjectStore(useShallow((state) => ({
        // projects: state.projects,
        selectedProject: state.selectedProject,
        actions: state.actions,
      })));
      const { data: projects = [], isPending, isError } = useProjects();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 
  
    const open = Boolean(anchorEl);
  
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => setAnchorEl(null);
  
    const handleSelect = (project: Project) => {
        actions.setSelectedProject(project);
        handleClose();
      };
  
    return (
      <>
        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{
            textTransform: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#4e4e4e',
            border:'none'
          }}
        >
          <CiFolderOn />
          <Typography variant="body1">
            {selectedProject?.name ?? 'Select Project'}
          </Typography>
          <HiChevronDown />
        </Button>
  
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}  >
        {isPending && (
          <MenuItem><CircularProgress size={20} /></MenuItem>
        )}

        {isError && (
          <MenuItem disabled>Error loading projects</MenuItem>
        )}
          {projects.map((project) => (
            <MenuItem
              key={project.id}
              selected={project.id === selectedProject?.id}
              onClick={() => handleSelect(project)}
              >
                  
              <ListItemText
                primary={project.name}
                secondary={project.description}
              />
             
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };
// src/components/ResumeViewer.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ResumeViewer = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        Resume Viewer
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <iframe
          src="/Resume-PaulStone.pdf"
          width="100%"
          height="600px"
          style={{ border: 'none' }}
          title="Resume"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ResumeViewer;

// src/components/TabContent.js
import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

function TabContent({ title, content }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4">{title}</Typography>
          <Typography paragraph>
            {content}
          </Typography>
        </Paper>
      </Container>
    </motion.div>
  );
}

export default TabContent;
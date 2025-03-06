// src/components/ChatInterface.js
import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  Divider,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';
import axios from 'axios';

function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am an AI assistant made to help answer questions about Paul Stone. How can I help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    // Add user message
    const userMessage = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input; // Store input value before clearing
    setInput('');
    setIsLoading(true);

    try {
      // Create conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.text
      }));

      // Add the new user message
      conversationHistory.push({
        role: 'user',
        content: currentInput
      });

      // Call your local Flask backend
      const response = await axios.post(
        'http://localhost:5000/api/chat',
        {
          messages: conversationHistory
        }
      );

      // Extract the AI response from the response data
      let aiResponse = "I received your message, but I'm having trouble generating a response. Please try again.";

      if (response.data && response.data.content) {
        // Anthropic API returns an array of content blocks
        aiResponse = response.data.content
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join('\n\n');
      } else if (response.data && response.data.error) {
        throw new Error(response.data.error);
      }

      // Add AI response to chat
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling backend:', error);

      // Add error message
      const errorMessage = {
        id: messages.length + 2,
        text: `I'm sorry, I encountered an error: ${error.response?.data?.error || error.message || "Unknown error"}. Please try again.`,
        sender: 'ai'
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pressing Enter to send
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
      <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" gutterBottom>
          AI Paul
        </Typography>
        <Divider />

        {/* Messages area */}
        <List sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ListItem
                alignItems="flex-start"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  p: 0
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    maxWidth: '75%'
                  }}
                >
                  {message.sender === 'ai' && (
                    <Avatar sx={{ bgcolor: 'primary.main' }}>AI</Avatar>
                  )}

                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100',
                      borderRadius: 2,
                      color: message.sender === 'user' ? 'white' : 'text.primary'
                    }}
                  >
                    <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                      {message.text}
                    </Typography>
                  </Paper>

                  {message.sender === 'user' && (
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>U</Avatar>
                  )}
                </Box>
              </ListItem>
            </motion.div>
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2, ml: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </List>

        {/* Input area */}
        <Box sx={{
          mt: 2,
          display: 'flex',
          gap: 1
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            disabled={isLoading}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            disabled={input.trim() === '' || isLoading}
            sx={{ minWidth: '48px', height: '48px' }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ChatInterface;
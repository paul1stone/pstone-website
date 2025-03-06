
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
import PsychologyIcon from '@mui/icons-material/Psychology';
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


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {

      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.text
      }));

      conversationHistory.push({
        role: 'user',
        content: currentInput
      });






      const response = await axios.post(
        '/api/chat',
        { messages: conversationHistory }
      );

      let aiResponse = "I received your message, but I'm having trouble generating a response. Please try again.";
      if (response.data && response.data.content) {
        aiResponse = response.data.content
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join('\n\n');
      } else if (response.data && response.data.error) {
        throw new Error(response.data.error);
      }

      const aiMessage = { id: messages.length + 2, text: aiResponse, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling backend:', error);
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


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        borderRadius: 2,
        boxShadow: 3,
        p: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>

          <Avatar sx={{ bgcolor: 'primary.main', justifyContent: 'center' }}><PsychologyIcon sx={{ alignSelf: 'center' }} /></Avatar>
          <Box>
            <Typography variant="h5">AI Paul</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Paul's AI assistant
            </Typography>
          </Box>
        </Box>
        <Divider />

        {/* Messages area */}
        <List sx={{
          flex: 1,
          overflowY: 'auto',
          mt: 2,
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          px: 1
        }}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ListItem sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                px: 0
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 1,
                  maxWidth: '75%'
                }}>
                  {message.sender === 'ai' && (
                    <Avatar sx={{ bgcolor: 'primary.main', justifyContent: 'center' }}><PsychologyIcon sx={{ alignSelf: 'center' }} /></Avatar>
                  )}
                  <Paper elevation={2} sx={{
                    p: 2,
                    backgroundColor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                    borderRadius: 2,
                    color: message.sender === 'user' ? 'white' : 'text.primary'
                  }}>
                    <Typography
                      variant="body1"
                      sx={{ whiteSpace: 'pre-wrap' }}
                      dangerouslySetInnerHTML={{ __html: message.text }}
                    />

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
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
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
            sx={{
              backgroundColor: 'white',
              borderRadius: 1
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            disabled={input.trim() === '' || isLoading}
            sx={{ minWidth: '56px', height: '56px', alignSelf: 'center' }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ChatInterface;

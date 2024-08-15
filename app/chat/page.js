'use client';
import { useState, useEffect } from "react";
import { Box, Button, Stack, TextField, IconButton, Typography, Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';

export default function Chat() {
  const router = useRouter();
  const [persona, setPersona] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedPersona = localStorage.getItem('selectedPersona');
    if (storedPersona) {
      const parsedPersona = JSON.parse(storedPersona);
      setPersona(parsedPersona);
      setMessages([{ role: 'assistant', content: parsedPersona.greeting }]);
    } else {
      router.push('/');
    }
  }, [router]);

  const sendMessage = async () => {
    if (!message || !persona) return;
    
    // Append user message to the chat history
    const updatedMessages = [...messages, { role: 'user', content: message }];
    setMessages(updatedMessages);
    setMessage('');

    // Prepare the conversation context for the API
    const context = [
      ...updatedMessages,
      { role: 'system', content: `You are ${persona.name}. ${persona.prompt}. Please keep your responses brief and to the point, but maintain conversational style` }
    ];

    // Fetch the AI response
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(context)
    });
    const data = await response.json();
    
    // Append AI response to the chat history
    setMessages([...updatedMessages, { role: 'assistant', content: data.message }]);
  };

  const handleBack = () => {
    router.push('/');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction="column" width="500px" height="700px" border="1px solid black" p={2} spacing={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">{persona?.name}</Typography>
        </Stack>
        <Stack direction="column" spacing={2} flexGrow={1} overflow="auto" maxHeight="100%">
          {messages.map((msg, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              alignItems="center"
              flexDirection={msg.role === 'user' ? 'row-reverse' : 'row'}
            >
              {msg.role === 'user' && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    bgcolor='secondary.main'
                    color="white"
                    borderRadius={8}
                    p={2}
                    maxWidth="70%"
                    textAlign="right"
                    sx={{ display: 'flex', alignItems: 'center' }} // Added margin-left for spacing
                  >
                    {msg.content}
                  </Box>
                  <Avatar sx={{ width: 40, height: 40, ml: 1 }}>
                    <PersonIcon />
                  </Avatar>
                </Box>
              )}
              {msg.role === 'assistant' && (
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                  <Avatar src={persona.image} alt={persona.name} sx={{ width: 40, height: 40, mr: 1 }} />
                  <Box
                    bgcolor='primary.main'
                    color="white"
                    borderRadius={8}
                    p={2}
                    maxWidth="70%"
                    textAlign="left"
                  >
                    {msg.content}
                  </Box>
                </Box>
              )}
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown} // Added keydown handler
          />
          <Button variant="contained" onClick={sendMessage}>Send</Button>
        </Stack>
      </Stack>
    </Box>
  );
}

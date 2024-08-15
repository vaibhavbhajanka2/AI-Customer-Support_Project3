'use client';
import { useRouter } from 'next/navigation';
import { Stack, Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

const personalities = [
  { 
    name: 'Albert Einstein', 
    image: '/albert.jpeg', // Replace with your image path
    prompt: 'You are Albert Einstein. Engage in deep, thoughtful discussions on topics related to science, mathematics, and the universe. For any random questions, provide answers with a focus on curiosity and scientific exploration, blending your wit and profound insights. Keep style conversational and natural.',
    greeting: 'Let\'s dive into the mysteries of the universe.'
  },
  { 
    name: 'Elon Musk', 
    image: '/elon.jpeg', // Replace with your image path
    prompt: 'You are Elon Musk. Discuss space exploration, technology, and future innovations with enthusiasm. For offbeat or random questions, respond with a forward-thinking and innovative perspective, using humor and visionary ideas to provide interesting answers. Keep style conversational and natural.',
    greeting: 'Ready to explore the final frontier?'
  },
  { 
    name: 'Nikola Tesla', 
    image: '/nikola.jpeg', // Image path for Nikola Tesla
    prompt: 'You are Nikola Tesla. Share your knowledge on electrical engineering, futuristic concepts, and your groundbreaking inventions. For unexpected questions, offer answers with an emphasis on imagination and the potential for technological advancement, staying true to your inventive spirit. Keep style conversational and natural.',
    greeting: 'Let\'s explore the wonders of electrical engineering and futuristic technologies.'
  },  
  { 
    name: 'Tom Clancy', 
    image: '/tom.jpeg', // Replace with your image path
    prompt: 'You are Tom Clancy. Provide advice on writing, storytelling, and creating suspenseful narratives. If faced with random questions, use your storytelling skills to give intriguing and well-thought-out responses, incorporating elements of suspense and detail that reflect your writing style. Keep style conversational and natural.',
    greeting: 'Let\'s craft a gripping story together.'
  },
  { 
    name: 'Steve Jobs', 
    image: '/steve.jpeg', // Replace with your image path
    prompt: 'You are Steve Jobs. Focus on creativity, innovation, and design thinking in your responses. For random questions, approach them with a mindset of thinking differently and solving problems in unique ways, providing answers that reflect your passion for design and innovation. Keep style conversational and natural.',
    greeting: 'Let\'s think differently and innovate together.'
  },
];

const RoundedCard = styled(Card)({
    borderRadius: '16px',
    cursor: 'pointer',
    overflow: 'hidden',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    }
  });
  
  const StyledCardMedia = styled(CardMedia)({
    height: '250px', // Fixed height for the image
    width: '200px',
    objectFit: 'cover',
  });
  
  const Title = styled(Typography)({
    fontFamily: 'Lobster, sans-serif',
    fontSize: '4rem',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  });

  const Subtitle = styled(Typography)({
    fontFamily: 'Lobster, sans-serif',
    fontSize: '1.5rem',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  });
  
  export default function Home() {
    const router = useRouter();
  
    const handlePersonaSelect = (persona) => {
      localStorage.setItem('selectedPersona', JSON.stringify(persona));
      router.push('/chat');
    };
  
    return (
      <Stack direction={'column'} spacing={8} justifyContent="center" alignItems="center" height="100vh" flexWrap="wrap">
        <Title>ChatterSphere</Title>
        <Subtitle>Select Your Visionary and Embark on a Legendary Conversation!</Subtitle>
        <Stack direction={'row'} spacing={8} justifyContent="center" alignItems="center" flexWrap="wrap">
          {personalities.map((persona, index) => (
            <RoundedCard key={index} onClick={() => handlePersonaSelect(persona)}>
              <StyledCardMedia
                component="img"
                image={persona.image}
                alt={persona.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {persona.name}
                </Typography>
              </CardContent>
            </RoundedCard>
          ))}
        </Stack>
      </Stack>
    );
  }
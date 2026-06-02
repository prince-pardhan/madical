'use client';

import { useState } from 'react';
import { TextInput, Button, Paper, Title, Text } from '@mantine/core';
import { IconMail } from '@tabler/icons-react';

export default function Login({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onLogin(email.trim().toLowerCase());
  };

  return (
    <Paper shadow="md" p="xl" radius="md" style={{ maxWidth: 400, margin: 'auto' }}>
      <Title order={2} mb="md" ta="center">Client Login</Title>
      <Text c="dimmed" ta="center" mb="xl">Apna Email Enter Karein</Text>

      <form onSubmit={handleSubmit}>
        <TextInput
          leftSection={<IconMail size={16} />}
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          size="lg"
        />
        <Button type="submit" fullWidth mt="xl" size="lg">
          Continue
        </Button>
      </form>
    </Paper>
  );
}
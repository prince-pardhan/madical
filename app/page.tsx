'use client';

import { useState } from 'react';
import { MantineProvider, Container, Title, Paper } from '@mantine/core';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [clientEmail, setClientEmail] = useState<string | null>(null);

  return (
    <MantineProvider>
      <Container size="lg" py="xl">
        {!clientEmail ? (
          <Login onLogin={setClientEmail} />
        ) : (
          <Dashboard email={clientEmail} onLogout={() => setClientEmail(null)} />
        )}
      </Container>
    </MantineProvider>
  );
}
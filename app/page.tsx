"use client";

import { useState } from "react";
import {
  Button,
  Container,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";

export default function Login() {
  const [email, setEmail] = useState("");

  const login = () => {
    localStorage.setItem(
      "clientEmail",
      email
    );

    window.location.href =
      "/dashboard";
  };

  return (
    <Container size="xs" mt={100}>
      <Paper p="lg">
        <Title order={2}>
          Client Login
        </Title>

        <TextInput
          mt="md"
          label="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.currentTarget.value
            )
          }
        />

        <Button
          fullWidth
          mt="md"
          onClick={login}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
}
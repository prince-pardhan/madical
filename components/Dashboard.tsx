'use client';

import { useEffect, useState } from 'react';
import { Button, Title, Group, Table, TextInput, NumberInput, ActionIcon, Paper } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import axios from 'axios';

type Medicine = {
  _id: string;
  name: string;
  price: number;
};

export default function Dashboard({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchMedicines = async () => {
    const res = await fetch(`/api/medicines?email=${email}`);
    const data = await res.json();
    setMedicines(data);
  };

  useEffect(() => { fetchMedicines(); }, [email]);

  const saveMedicine = async () => {
    if (!name || price === undefined) return;

    if (editingId) {
      await axios.put('/api/medicines', { id: editingId, name, price });
    } else {
      await axios.post('/api/medicines', { clientEmail: email, name, price });
    }

    setName('');
    setPrice(undefined);
    setEditingId(null);
    fetchMedicines();
  };

  const editMedicine = (med: Medicine) => {
    setName(med.name);
    setPrice(med.price);
    setEditingId(med._id);
  };

  const deleteMedicine = async (id: string) => {
    await axios.delete('/api/medicines', { data: { id } });
    fetchMedicines();
  };

  return (
    <div>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Client: {email}</Title>
        <Button variant="light" onClick={onLogout}>Logout</Button>
      </Group>

      <Paper p="md" mb="xl" withBorder>
        <Title order={4} mb="md">{editingId ? 'Update' : 'Add New'} Medicine</Title>
        <Group>
          <TextInput
            placeholder="Medicine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ flex: 1 }}
          />
          <NumberInput
            placeholder="Price"
            value={price}
            onChange={(val) => setPrice(val as number)}
            style={{ width: 150 }}
          />
          <Button onClick={saveMedicine}>
            {editingId ? 'Update' : 'Add'}
          </Button>
          {editingId && <Button variant="outline" onClick={() => { setEditingId(null); setName(''); setPrice(undefined); }}>Cancel</Button>}
        </Group>
      </Paper>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Medicine Name</Table.Th>
            <Table.Th>Price (₹)</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {medicines.map(med => (
            <Table.Tr key={med._id}>
              <Table.Td>{med.name}</Table.Td>
              <Table.Td>₹{med.price}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon color="blue" onClick={() => editMedicine(med)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => deleteMedicine(med._id)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
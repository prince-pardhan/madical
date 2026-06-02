"use client";

import {
  Button,
  Container,
  NumberInput,
  Table,
  TextInput,
} from "@mantine/core";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [medicineName, setMedicineName] =
    useState("");

  const [price, setPrice] = useState(0);

  const [data, setData] = useState<any[]>([]);

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem(
          "clientEmail"
        )
      : "";

  const loadData = async () => {
    const res = await fetch(
      "/api/medicines"
    );

    const result = await res.json();

    setData(
      result.filter(
        (item: any) =>
          item.clientEmail === email
      )
    );
  };

  const saveMedicine = async () => {
    await fetch("/api/medicines", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        clientEmail: email,
        medicineName,
        price,
      }),
    });

    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <TextInput
        label="Medicine Name"
        value={medicineName}
        onChange={(e) =>
          setMedicineName(
            e.currentTarget.value
          )
        }
      />

      <NumberInput
        label="Price"
        value={price}
        onChange={(v) =>
          setPrice(Number(v))
        }
      />

      <Button
        mt="md"
        onClick={saveMedicine}
      >
        Save
      </Button>

      <Table mt="xl">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              Medicine
            </Table.Th>
            <Table.Th>
              Price
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data.map((item) => (
            <Table.Tr key={item._id}>
              <Table.Td>
                {item.medicineName}
              </Table.Td>

              <Table.Td>
                ₹{item.price}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
}
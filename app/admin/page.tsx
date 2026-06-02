"use client";

import { useEffect, useState } from "react";
import { Container, Table } from "@mantine/core";

export default function AdminPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/medicines")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <Container>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Email</Table.Th>
            <Table.Th>Medicine</Table.Th>
            <Table.Th>Price</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data.map((item: any) => (
            <Table.Tr key={item._id}>
              <Table.Td>
                {item.clientEmail}
              </Table.Td>

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
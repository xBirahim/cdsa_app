import React, { useEffect, useState } from "react";
import { Table, Container } from "@nextui-org/react";

const UserTable = ({ users }) => {
  const columns = [
    {
      key: "id",
      label: "Id",
    },
    {
      key: "name",
      label: "Name",
    },
    { key: "surname", label: "Surname" },
  ];

  return (
    <>
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        css={{
          height: "200px",
          width: "400px",
          minHeight: "150px",
          minWidth: "300px",
        }}
      >
        <Table
          lined
          headerLined
          
          selectionMode="multiple"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column key={column.key}>{column.label}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={users}>
            {(item) => (
              <Table.Row key={item.key}>
                {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
};

export default UserTable;

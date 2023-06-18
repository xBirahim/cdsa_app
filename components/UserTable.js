import React, { useState } from "react";
import { Table, Card, Checkbox, Button } from "@nextui-org/react";
import { useRouter } from "next/router";

const UserTable = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const router = useRouter();

  const columns = [
    {
      key: "checkbox",
      label: "",
    },
    {
      key: "id",
      label: "Id",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "surname",
      label: "Surname",
    },
    {
      key: "status",
      label: "Statut",
    },
    {
      key: "reference",
      label: "Référence de la commande",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  const handleCheckboxChange = (event, userId) => {
    if (event && event.target && event.target.checked) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== userId)
      );
    }
  };

  const handleSelectAll = (event, users) => {
    if (event && event.target && event.target.checked) {
      const allUserIds = users.map((user) => user.id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleAddUser = () => {
    router.push("/AddUser");
  };

  const handleEditUser = () => {
    router.push("UpdateUser");
  };

  const handleDeleteUser = () => {
    // Logique pour supprimer un utilisateur
  };

  return (
    <div>
      <Card
        isPressable
        isHoverable
        css={{
          height: "auto",
          width: "auto",
          minHeight: "150px",
          minWidth: "400px",
        }}
      >
        <Checkbox
          checked={selectedUsers.length === users.length}
          onChange={(e) => handleSelectAll(e, users)}
        >
          Sélectionner tout
        </Checkbox>

        <Table
          css={{
            height: "auto",
            minWidth: "100%",
            marginTop: "16px",
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
                {(columnKey) =>
                  columnKey === "checkbox" ? (
                    <Table.Cell>
                      <Checkbox
                        checked={selectedUsers.includes(item.id)}
                        onChange={(e) => handleCheckboxChange(e, item.id)}
                      />
                    </Table.Cell>
                  ) : columnKey === "actions" ? (
                    <Table.Cell key={columnKey}>
                      <Button
                        auto
                        size="mini"
                        bordered
                        color="primary"
                        onClick={handleEditUser}
                      >
                        Modifier
                      </Button>
                      <Button
                        auto
                        size="mini"
                        bordered
                        color="primary"
                        onClick={handleDeleteUser}
                      >
                        Supprimer
                      </Button>
                    </Table.Cell>
                  ) : (
                    <Table.Cell
                      css={{
                        fontWeight: columnKey === "id" ? "bold" : "normal",
                        color: columnKey === "status" ? "#ff0000" : "inherit",
                      }}
                    >
                      {item[columnKey]}
                    </Table.Cell>
                  )
                }
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Card>
      <Button
        auto
        size="small"
        color="primary"
        onClick={handleAddUser}
        style={{ margin: "16px auto" }}
      >
        Ajouter
      </Button>
    </div>
  );
};

export default UserTable;

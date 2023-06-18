import React, { useState } from "react";
import { Table, Card, Checkbox, Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Select } from "@nextui-org/react";

const UserTable = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const router = useRouter();

  const columns = [
    {
      key: "checkbox",
      title: "",
    },
    {
      key: "id",
      title: "Id",
    },
    {
      key: "name",
      title: "Name",
    },
    {
      key: "surname",
      title: "Surname",
    },
    {
      key: "status",
      title: "Statut",
    },
    {
      key: "reference",
      title: "Référence de la commande",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];

  const handleCheckboxChange = (event, userId) => {
    if (event.target.checked) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== userId)
      );
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
        hoverable
        style={{
          height: "200px",
          width: "600px",
          minHeight: "150px",
          minWidth: "400px",
        }}
      >
        <Table
          style={{
            height: "auto",
            minWidth: "100%",
          }}
          data={users}
          columns={columns}
          keyField="id"
        >
          {(item) => (
            <>
              <Table.Cell>
                <Checkbox
                  checked={selectedUsers.includes(item.id)}
                  onChange={(e) => handleCheckboxChange(e, item.id)}
                />
              </Table.Cell>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.surname}</Table.Cell>
              <Table.Cell>{item.status}</Table.Cell>
              <Table.Cell>{item.reference}</Table.Cell>
              <Table.Cell>
                <Select
                  auto
                  size="mini"
                  bordered
                  placeholder="Sélectionner une action"
                  onChange={(value) => {
                    if (value === "Modifier") {
                      handleEditUser();
                    } else if (value === "Supprimer") {
                      handleDeleteUser();
                    }
                  }}
                >
                  <Select.Option value="Modifier">Modifier</Select.Option>
                  <Select.Option value="Supprimer">Supprimer</Select.Option>
                </Select>
              </Table.Cell>
            </>
          )}
        </Table>
        <Button auto size="small" onClick={handleAddUser}>
          Ajouter
        </Button>
      </Card>
    </div>
  );
};

export default UserTable;

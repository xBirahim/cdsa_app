import React, { useState } from "react";
import { Grid, Input, Checkbox } from "@nextui-org/react";
import UserTable from "components/UserTable";

export default function Users() {
  const userList = [
    { id: 1, name: "xxx", surname: "diop", status: "En cours", reference: "REF123" },
    { id: 2, name: "yyy", surname: "dia", status: "Terminée", reference: "REF456" },
    { id: 3, name: "aaa", surname: "dioum", status: "En cours", reference: "REF789" },
    { id: 4, name: "mmm", surname: "diallo", status: "Annulée", reference: "REF987" },
  ];

  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState([]);
  const [searchField, setSearchField] = useState("name");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleStatusChange = (status, checked) => {
    if (checked) {
      setFilterStatus((prevFilterStatus) => [...prevFilterStatus, status]);
    } else {
      setFilterStatus((prevFilterStatus) =>
        prevFilterStatus.filter((item) => item !== status)
      );
    }
  };

  const handleSearchFieldChange = (field) => {
    setSearchField(field);
  };

  const filteredUsers = userList.filter((user) =>
    user[searchField].toLowerCase().includes(searchValue.toLowerCase()) &&
    (filterStatus.length === 0 || filterStatus.includes(user.status))
  );

  const handleReferenceChange = (event) => {
    const inputValue = event.target.value;
    const referenceValue = inputValue ? `REF${inputValue}` : "";
    setSearchValue(referenceValue);
  };

  return (
    <>
      <div style={{ padding: "1rem", marginBottom: "1rem" }}>
        <div>
          <input
            type="radio"
            id="name"
            name="searchField"
            value="name"
            checked={searchField === "name"}
            onChange={() => handleSearchFieldChange("name")}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            type="radio"
            id="reference"
            name="searchField"
            value="reference"
            checked={searchField === "reference"}
            onChange={() => handleSearchFieldChange("reference")}
          />
          <label htmlFor="reference">Reference</label>
        </div>
        {searchField === "reference" ? (
          <div style={{ marginTop: "1rem" }}>
            <Input
              bordered
              labelLeft="REF"
              placeholder="XXX"
              value={searchValue.substring(3)}
              onChange={handleReferenceChange}
            />
          </div>
        ) : (
          <div style={{ marginTop: "1rem" }}>
            <Input
              bordered
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        )}
        <div style={{ marginTop: "1rem" }}>
          <span>Status commande</span>
          <Checkbox
            checked={filterStatus.includes("En cours")}
            onChange={(checked) => handleStatusChange("En cours", checked)}
            label="En cours"
          />
          <Checkbox
            checked={filterStatus.includes("Terminée")}
            onChange={(checked) => handleStatusChange("Terminée", checked)}
            label="Terminée"
          />
          <Checkbox
            checked={filterStatus.includes("Annulée")}
            onChange={(checked) => handleStatusChange("Annulée", checked)}
            label="Annulée"
          />
        </div>
      </div>
      <Grid.Container justify="center" css={{ height: "100vh" }}>
        <UserTable users={filteredUsers} />
      </Grid.Container>
    </>
  );
}

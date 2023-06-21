import { Grid } from "@nextui-org/react";
import UserTable from "components/UserTable";

export default function Users() {
  const testList = [
    { id: 1, name: "xxx", surname:"diop"},
    { id: 2, name: "yyy", surname:"dia" },
    { id: 3, name: "aaa", surname:"dioum" },
    { id: 4, name: "mmm", surname:"diallo" },
  ];

  return (
    <>
      <Grid.Container
        justify="center"
        css={{
          height: "100vh",
        }}
      >
        <UserTable users={testList}></UserTable>
      </Grid.Container>
    </>
  );
}

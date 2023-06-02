import { Button, Input, Link, Navbar, Text, Spacer } from "@nextui-org/react";

const NavigationBar = () => {

  return (
    <Navbar isBordered variant="static">
      <Navbar.Toggle />
      <Navbar.Brand>
        <Text
          onClick={() => {
            // router.push("#");
            console.log("Click!");
          }}
          b
          color="inherit"
          // hideIn="lg"
        >
          MSPR
        </Text>
      </Navbar.Brand>

      <Navbar.Collapse>
        <Navbar.CollapseItem key={1}>
          <Link href="#">Home</Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key={2}>
          <Link href="#">About</Link>
        </Navbar.CollapseItem>
      </Navbar.Collapse>

      <Navbar.Content>
        <Navbar.Link color="inherit" href="#">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="/registration">
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default NavigationBar;

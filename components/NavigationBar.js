import { Button, Input, Link, Navbar, Text, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";

const NavigationBar = ({ children }) => {

  const router = useRouter();

  return (
    <Navbar isCompact isBordered variant="sticky" css={{width: "100%"}}>
      <Navbar.Brand>
        <Text onClick={() => { router.push("#") }} b color="inherit" hideIn="xs">
          MSPR
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline">
        <Navbar.Link onMouseOver={(e) => {console.log(e)}} href="#">Home</Navbar.Link>
        <Navbar.Link href="#">Lien</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="#">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="#">
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>

  );
};

export default NavigationBar;

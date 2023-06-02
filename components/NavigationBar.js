import { Button, Input, Link, Navbar, Text, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";

const NavigationBar = ({ children }) => {

  const router = useRouter();

  return (
    <Navbar isCompact isBordered variant="sticky" css={{width: "100%", backgroundColor: "#4A2511"}}>
      <Navbar.Brand>
        <link rel='icon' href='/favicon.ico' />
        <Text onClick={() => { router.push("#") }} b color="inherit" hideIn="xs">
          PAYE TON KAWA
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline">
        <Navbar.Link onMouseOver={(e) => {console.log(e)}} href="#">Home</Navbar.Link>
        <Navbar.Link href="#">Lien</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="login">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="register">
          Register
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>

  );
};

export default NavigationBar;

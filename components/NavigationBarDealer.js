import { Button, Input, Link, Navbar, Text, Spacer, Dropdown, Avatar } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "react-iconly";
import { Service } from "tools/service";

const NavigationBarDealer = () => {

  const [dealerData, setDealerData] = useState({});
  const [dealerid, setDealerId] = useState(0);

  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    setDealerId(localStorage.getItem('userid'))

  }, [])

  useEffect(() => {
    let link = `https://localhost:7063/api/Dealers/${dealerid}`;
    const fetchItems = async () => {
      
      try {
        const response = await Service.get(link);
        setDealerData(response.data);

      } catch (error) {
        console.log(error);
      }
    };    

    fetchItems();
  }, [dealerid])

  console.log("Navbar dID: ", dealerData);

    const collapseItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
      ];

  return (
    <Navbar isBordered variant="static">
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <Text b color="inherit" hideIn="xs">
          ACME
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        <Navbar.Link href="#">Features</Navbar.Link>
        <Navbar.Link isActive href="#">
          Customers
        </Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Company</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                size="md"
                icon={<User set="bold" />}
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => console.log({ actionKey })}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                {dealerData.name}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider>
              <Button
                color="error"
                onPress={() => {
                  localStorage.removeItem("userid")
                  router.push("/");
                }}
              >
                Log Out
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={index === 2}
          >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBarDealer;

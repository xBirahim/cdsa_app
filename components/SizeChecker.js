import { Card } from "@nextui-org/react";

const component = (
  <Card
    auto
    animated={true}
    css={{
      borderRadius: "$xs",
      border: "$space$1 solid transparent",
      color: "$green100", // default color
      bg: "$green800", // default background
      fontSize: "$space$9",
      boxShadow: "$md",
      "@xs": {
        bg: "$blue800",
        color: "$blue100",
      },
      "@sm": {
        bg: "$yellow800",
        color: "$yellow100",
      },
      "@md": {
        bg: "$purple800",
        color: "$purple100",
      },
      "@lg": {
        bg: "$pink800",
      },
    }}
  >
    Resize the window
  </Card>
);

const SizeChecker = () => {
  return component;
};

export default SizeChecker;

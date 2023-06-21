import { Table, Row, Col, Tooltip, User, Text, Container, Card, Collapse } from "@nextui-org/react";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeButton";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { useEffect, useState } from "react";
import { Service } from "tools/service";

const ManageProduct = ({dealerid}) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let link = `https://localhost:7063/api/Dealers/${dealerid}/products`;
        const response = await Service.get(link);
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  return (
    <Container css={{ width: "100%" }}>
          <Collapse.Group>
      <Collapse title="My Products">

      </Collapse>
      <Collapse title="My Orders">
      </Collapse>

    </Collapse.Group>
    </Container>
  );
}

export default ManageProduct;
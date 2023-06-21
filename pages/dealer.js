import React, { useState } from "react";
import { Grid, Col, Text, Button } from "@nextui-org/react";
import Gradient from "components/Themes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NavigationBarDealer from "components/NavigationBarDealer";
import ManageProduct from "components/ManageProduct";
import { Service } from "tools/service";

 const Dealer = () => {

  const [dealerid, setDealerId] = useState(0);
  const [dealerData, setDealerData] = useState({});

  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    if (localStorage.getItem('userid') == null) {
      router.push("/")
    }

  }, [])

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

  console.log(dealerid);
   return (
     <>
       <NavigationBarDealer />
       <Grid.Container
         justify="center"
         css={{
           height: "100vh",
           bg: Gradient,
         }}
       >
         <Grid alignItems="center">
           <Col css={{ width: "100%" }}>
             <ManageProduct dealerid={dealerid} />
           </Col>
         </Grid>
       </Grid.Container>
     </>
   );
 };

 export default Dealer;
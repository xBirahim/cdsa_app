import React, { useState } from "react";
import { Grid, Col, Text, Button } from "@nextui-org/react";
import Gradient from "components/Themes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NavigationBar from "components/NavigationBar";
import { Service } from "tools/service";

 const Dealer = () => {

  const [id, setId] = useState(0);
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
    setId(localStorage.getItem('userid'))

  }, [])
  useEffect(() => {
    let link = `https://64e3bc10bac46e480e7923a0.mockapi.io/revendeur/${id}`;
    const fetchItems = async () => { 
      try {
        const response = await Service.get(link);
        setDealerData(response.data);

      } catch (error) {
        console.log(error);
      }
    };    
    fetchItems();
  }, [id])

  console.log(id);
   return (
     <>
       <Grid.Container
         justify="center"
         css={{
           height: "100vh",
           bg: Gradient,
         }}
       >
       </Grid.Container>
     </>
   );
 };

 export default Dealer;
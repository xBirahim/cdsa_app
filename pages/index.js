//import Image from "next/image";
import React, { Component, useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Button, Row, Spacer, Avatar, Grid, Text, Dropdown, Container, Card} from '@nextui-org/react';
import { User } from "@nextui-org/react";
//import Profile from "./register";

export default class NextJsCarousel extends Component {
  render() {
    const text = "Paye ton KAWA car le café c'est la vie";
    const text2 = "A la une";
    const text3 = "Voir toutes les promotions";
    const text4 = "Les derniers avis";
    const text5 = "+ de 1000 avis collectés";
    const text6 = "Voir tous les avis...";
      return (
          <div> 
            <Text h1 size={17}  weight="bold" css={{ as: 'center', mb: '10px', ml:'10%' }}>{text}</Text>
            <Carousel>
                <div>
                    <img src="https://www.lemondedesartisans.fr/sites/lemondedesartisans.fr/files/illustrations/articles/cafe-torrefacteurs.jpg" alt="image1"/>
                    <p className="legend">Le café c'est la vie</p>
                </div>
                <div>
                    <img src="https://www.lanouvelle.net/wp-content/uploads/sites/41/2021/05/STOREC.jpg" alt="image2" />
                    <p className="legend">Image 2</p>
                </div>
                <div>
                    <img src="https://uploads.unify.uno/content/2022/7/5/effet-corps-arret-cafe-6f8e9389bbfef24d.jpeg"/>
                    <p className="legend">Image 3</p>
                </div>
                <div>
                    <img src="https://www.allrecipes.com/thmb/gk1cHP21-syS3M_dz1cr6DWxhfE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1165807395-2000-28ea3eaf72f34ddaa97d9a54ca0c6025.jpg"/>
                    <p className="legend">Image 4</p>
                </div>
                <div>
                    <img src="https://img.passeportsante.net/1200x675/2023-02-15/cafe.webp" alt="image5"/>
                    <p className="legend">Image 5</p>
                </div>
            </Carousel>
            <div>

            <Row justify="space-between" css={{marginLeft: '20px'}}>           
              <Grid>
                  <Avatar squared src="https://us.123rf.com/450wm/faysalfarhan/faysalfarhan1605/faysalfarhan160504541/57292041-travail-d-%C3%A9quipe-groupe-ic%C3%B4ne-bouton-rond-marron-glac%C3%A9.jpg?ver=6" /><h3> Équipe bienveillante</h3>
              </Grid><Spacer x={1} /> 
              <Grid>
                  <Avatar squared src="https://cdn-icons-png.flaticon.com/512/5131/5131594.png" /><h3> PME française</h3>
              </Grid><Spacer x={1} />
              <Grid>
                  <Avatar squared src="https://cdn-icons-png.flaticon.com/512/3476/3476063.png" /><h3> Livraison express</h3>
              </Grid><Spacer x={1} /> 
            </Row> <Spacer y={1}/>

            <Container alignItems="center" justify="center">
            <Card css={{ mw: '420px', p: '20px' }}>
            <Dropdown>
              <Dropdown.Button flat>Capsules et Dosettes</Dropdown.Button>
              <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item key="">Voir les capsules Nexpresso</Dropdown.Item>
                <Dropdown.Item key="">Voir les Dossettes Senseo</Dropdown.Item>
                <Dropdown.Item key="">Voir les dossettes Tassimo</Dropdown.Item>
                <Dropdown.Item key="" color="primary">Tout voir</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </Card>
            </Container><Spacer y={1}/>
            <Container alignItems="center" justify="center">
            <Card css={{ mw: '420px', p: '20px' }}>
            <Dropdown>
              <Dropdown.Button flat>Café en grains</Dropdown.Button>
              <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item key="">Voir les cafés Italiens</Dropdown.Item>
                <Dropdown.Item key="">Voir les cafés torréfiés en France</Dropdown.Item>
                <Dropdown.Item key="">Voir les cafés Bio</Dropdown.Item>
                <Dropdown.Item key="" color="primary">Tout voir</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </Card>
            </Container><Spacer y={1}/>
            <Container alignItems="center" justify="center">
            <Card css={{ mw: '420px', p: '20px' }}>
            <Dropdown>
              <Dropdown.Button flat>Machine à café</Dropdown.Button>
              <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item key="">Voir les auto-broyeurs grains</Dropdown.Item>
                <Dropdown.Item key="">Voir les Expresso precolateur</Dropdown.Item>
                <Dropdown.Item key="">Voir les machines nexpresso</Dropdown.Item>
                <Dropdown.Item key="" color="primary">Tout voir</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </Card>
            </Container><Spacer y={1}/>
            </div>
            <div>
            </div><Spacer y={1}/>
            <div>
              <Text h1 size={30}  weight="bold" css={{ textGradient: "45deg, $yellow600 -20%, $red600 100%", mb: '10px', ml:'13%' }}>{text4}</Text>
              <Text h1 size={15}  css={{ textGradient: "45deg, $yellow600 -20%, $red600 100%", mb: '10px', ml:'20%', mt:'-10px' }}>{text5}</Text>
            <Row>
              <div>
               <Carousel> 
                 
                <div>  
                <Row>        
                    <Card css={{ mw: '100%', p: '20px' }}>
                        <User src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana " pointer/>
                        <p>Lecafé bio est d'excellente qualité. Je vous le recommande</p>
                    </Card><Spacer x={1}/>
                    <Card css={{ mw: '100%', p: '20px' }}>
                        <User src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name=" Wattson" pointer/>
                        <p>Lecafé bio est d'excellente qualité. Je vous le recommande</p>
                    </Card><Spacer x={1}/>
                  </Row>
                </div>
                   
                </Carousel> 
              </div>
            </Row>
            <Text h1 size={15}  css={{ textGradient: "45deg, $yellow600 -20%, $red600 100%", mb: '10px', ml:'35%', mt:'-25px' }}>{text6}</Text>
            </div>
          </div>
          
      );
  }
};
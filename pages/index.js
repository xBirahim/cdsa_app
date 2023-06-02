import Head from "next/head";
import Link from "next/link";
//import Image from "next/image";
import { Image } from '@nextui-org/react';
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default class NextJsCarousel extends Component {
  render() {
      return (
          <div css={{marginTop: '-305px'}}>
           
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
          </div>
      );
  }
};

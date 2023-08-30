import { Card, Container, Text, Button, Textarea } from "@nextui-org/react";
import Scanner from "components/Scanner";
import Image from "next/image";
import { useEffect, useState } from "react";
import  QRCode  from "qrcode";
import { sendConfirmationMail } from "lib/api";

export default function CameraTest() {

  const [textvalue, setTextValue] = useState("")
  const [qrcode, setQrcode] = useState()

  const generateQrCode = async () =>{
    QRCode.toDataURL(textvalue, { type: "png" }).then((img) => {
      console.log(img);
      setQrcode(img)
      return img;
    });
  }

  const onSubmit = async () => {
    try {
      await sendConfirmationMail({image: generateQrCode() , to: "ptktest@yopmail.com"});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Textarea
        value={textvalue}
        onChange={(e) => {
          setTextValue(e.target.value);
        }}
      ></Textarea>
      <Button onPress={onSubmit} >Generer</Button>
    </>
  );
  
}
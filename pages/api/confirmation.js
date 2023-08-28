import { mailOptions, transporter } from "../../config/nodemailer";
import  QRCode  from "qrcode";

const CONTACT_MESSAGE_FIELDS = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

const generateQrCode = async () =>{
    QRCode.toDataURL("123", { type: "png" }).then((img) => {
      return img;
    });
  }

const generateEmailContent = (data) => {

  return {
    text: "test",
    html: `
    <h1>Contenu de l'e-mail</h1>
    <p>Ceci est un exemple d'e-mail avec une image :</p>
    <img src="${generateQrCode()}" alt="Image" />
  `,
  };
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (data == null) {
      return res.status(400).send({ message: "Bad request" });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(data),
        subject: data.subject,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};
export default handler;
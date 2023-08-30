import { mailOptions, transporter } from "../../config/nodemailer";
import QRCode from "qrcode";

const generateEmailContent = async (data) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL("123", { type: "png" });

    return {
      text: "Merci pour votre inscription sur Paye Ton Kawa!",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Merci pour votre inscription</title>
        <style>
          /* Vos styles CSS ici */
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Merci pour votre inscription!</h1>
          <p>Nous sommes ravis de vous accueillir sur Paye Ton Kawa. Pour valider votre compte, veuillez suivre l'une des étapes suivantes:</p>
          
          <div class="qr-code">
            <img src="${qrCodeDataUrl}" alt="QR Code" width="150">
            <p>Scannez le QR Code ci-dessous avec votre application de lecture QR Code.</p>
          </div>
  
          <p>Ou</p>
  
          <a class="button" href="https://example.com/validate-account">Valider votre compte</a>
          
          <p>Merci de faire partie de la communauté Paye Ton Kawa!</p>
        </div>
      </body>
      </html>
      `,
    };
  } catch (error) {
    console.error("Erreur lors de la génération du QR Code :", error);
    return null;
  }
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (data == null) {
      return res.status(400).send({ message: "Bad request" });
    }

    try {
      const emailContent = await generateEmailContent(data);
      if (!emailContent) {
        return res.status(500).json({ message: "Erreur lors de la génération du contenu de l'e-mail" });
      }

      await transporter.sendMail({
        from: "paye.ton.kawa.infos@gmail.com",
        to: data["to"],
        ...emailContent,
        subject: "Merci pour votre inscription sur Paye Ton Kawa",
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

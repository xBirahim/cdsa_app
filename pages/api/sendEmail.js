import sgMail from "@sendgrid/mail";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { toEmail, qrDataURL } = req.body;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: toEmail,
    from: "your_email@example.com", // Remplacez par votre adresse e-mail
    subject: "Votre code QR",
    html: `<p>Voici votre code QR :</p><br><img src="${qrDataURL}" alt="Code QR" />`,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error sending email" });
  }
}

import nodemailer from "nodemailer";

const email = "paye.ton.kawa.infos@gmail.com";
const pass = "brxqnjmxrqwokbib";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};
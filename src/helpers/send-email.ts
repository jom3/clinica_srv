import nodemailer from 'nodemailer';
import { User } from '../entities';

export const SendEmail = (msg:string,user:User) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.NODEMAILER_PASS
    }
  });
  
  async function main() {
    const info = await transporter.sendMail({
      from: `Fred Foo 👻 <${process.env.GMAIL_USERNAME}>`,
      to: user.email,
      subject: "Hello ✔",
      text: "Hello world?",
      html: `${msg}`,
    });
  }
  
  main().catch(console.error);
}
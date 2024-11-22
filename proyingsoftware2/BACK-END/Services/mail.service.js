import nodemailer from 'nodemailer';

// Configurar el transporte de Nodemailer para Gmail
const Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "andriuchg14@gmail.com", // Tu cuenta de Gmail
      pass: "kxrq iivo wjqc zfwj" // Contraseña de aplicación generada
    }
  });

  Transporter.verify(() => {
    console.log("Listo para enviar emails"); 
  })

  export default Transporter;

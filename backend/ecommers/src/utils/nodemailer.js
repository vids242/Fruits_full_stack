const nodemailer = require('nodemailer');
const exportpdfmake = require('./pdfmake');

const sendMail = async (receiverEmail) => {
    // console.log(receiverEmail);
    const transporter = await nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use true for port 465, false for all other ports
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD,
        }
    });

    exportpdfmake()
    const mailOptions = {
        from: process.env.NODEMAILER_USER, // sender address
        to: receiverEmail, // receiver's email address
        subject: "Node Js Mail Testing", // Subject line
        text: "Your registration is successful", // plain text body
        attachments: [
            {
                filename: 'img2.jpeg',
                path: "./src/utils/Image/img2.jpeg"
            },
            {
                filename: 'document.pdf',
                path: "../../backend/ecommers/document.pdf"
            }
        ]

    };

    await transporter.sendMail(mailOptions, (error, emailResponse) => {
        if (error) throw error;
        // console.log("Email sent successfully!");
    });
};

module.exports = sendMail;
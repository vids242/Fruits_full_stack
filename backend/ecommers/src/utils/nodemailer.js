const nodemailer = require('nodemailer');
const { path } = require('../routes/api/v1/variants.routs');

const sendMail = async (receiverEmail) => {
    console.log(receiverEmail);
    const transporter = await nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use true for port 465, false for all other ports
        auth: {
            user: "vrajd2602@gmail.com",
            pass: "qdecipoymmrkbtsn",
        }
    });

    
    const mailOptions = {
        from: 'vrajd2602@gmail.com', // sender address
        to: receiverEmail, // receiver's email address
        subject: "Node Js Mail Testing", // Subject line
        text: "Your registration is successful", // plain text body
        attachments : [{
            filename: 'img2.jpeg',
            path: "./src/utils/Image/img2.jpeg"
        }]
        
    };

    await transporter.sendMail(mailOptions, (error, emailResponse) => {
        if (error) throw error;
        console.log("Email sent successfully!");
    });
};

module.exports = sendMail;
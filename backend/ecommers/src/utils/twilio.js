const sendOTP = (req, res, next) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);

        const otp = Math.floor(1000 + Math.random() * 9000);

        req.session.otp = otp

        client.messages
            .create({
                body: otp,
                from: '+12513103799',
                to: '+918780729677'
            })
            .then(message => next())
         
    } catch (error) {
        console.log("sentOTP error", error);

    }
}

const verifyOTP = (req, res, next) => {
    try {
        console.log("session otp",req.session.otp);
        console.log("body otp",req.body);

        if (req.session.otp == req.body.otp) {
            next()
        }

        res.status(400).json({
            success: false,
            message: "OTP invalid..!"
        })


    } catch (error) {
        console.log("verifyOTP error", error);
    }
}

module.exports = {
    sendOTP,
    verifyOTP
}
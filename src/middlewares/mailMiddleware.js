import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pragyasaxena4135@gmail.com',
        pass: 'juip kwic snpp wwhf'
    },
});

export async function sendMail(req, res, next) {
    const userMailId = req.body.email;

    const mailOptions = {
        from: 'pragyasaxena4135@gmail.com',
        to: userMailId,
        subject: "Account Created",
        text: 'Welcome to Easily! Your registration is successful. Start exploring job opportunities and take the next step in your career journey! \n \n Warm Regards, \n Team Easily',
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        next();
    } catch (err) {
        console.error("Error sending email:", err);
        next(err); 
    }
}

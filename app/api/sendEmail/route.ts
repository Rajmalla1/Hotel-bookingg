import nodemailer from 'nodemailer';
import { NextResponse } from "next/server";

const nodeMailerCredentials = async () => {
    return nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_SMTP_USERNAME,
            pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
        },
    });
};

const getEmailTemplate = async (email: string[], subject: string, title: string, text: string) => {
    return {
        from: {
            name: "Raj Hotel",
            address: "admin@rajhotel.com"
        },
        to: email,
        subject: subject,
        text: `${subject}`,
        html: `<body>
            <div style="font-family: 'Muli', sans-serif !important;">
                <div style="max-width: 400px; padding:0 16px 16px 16px;">
                    <div style="max-width: 400px;">
                        <h2 style="text-align: start;">${title}</h2>
                        <strong>Hey,</strong>
                        <p>${text}</p>
                    </div>
                    <div style="background-color:#1e76fe; max-width:400px; color:#fff; padding:10px 30px; border-radius:3px; text-align:center;">
                        <a href="https://hotel-bookingg-delta.vercel.app/" style="color:#fff; text-decoration:none;">Visit Us</a>
                    </div>
                </div>
        </body>`,
    };
}

export async function POST(request: Request) {
    const body = await request.json()
    const { email, subject, title, text } = body

    try {
        const transporter = await nodeMailerCredentials();
        const mailOptions = await getEmailTemplate(email, subject, title, text);
        transporter.sendMail(mailOptions, (error, errorResponse) => {
            if (error) {
                return NextResponse.json({ error: 'Error sending email' }, { status: 400 });
            }
            console.log("Success");
            console.log(errorResponse);
        });
        return NextResponse.json({ message: 'Offer Email Sent to Users' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
}

const contactNotificationTemplate = (
    name: string,
    email: string,
    mobileNo: string,
    accountType: string,
    message: string
): string => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Inquiry</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 20px;
                padding: 20px;
                background-color: #f4f4f4;
                color: #333;
            }
            h1 {
                color: #007BFF;
            }
            .content {
                background: white;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
        </style>
    </head>
    <body>
        <div class="content">
            <h1>New Contact Inquiry</h1>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile No:</strong> ${mobileNo}</p>
            <p><strong>Account Type:</strong> ${accountType}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p>Please follow up with this contact at your earliest convenience.</p>
            <p>Thank you,<br>The DesignIdeaz Team</p>
        </div>
    </body>
    </html>`;
};

export default contactNotificationTemplate;

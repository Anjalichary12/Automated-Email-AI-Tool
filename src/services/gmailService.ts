import { google } from 'googleapis';

const gmail = google.gmail('v1');

export async function readEmails(auth: any) {
    const res = await gmail.users.messages.list({
        userId: 'me',
        auth,
    });

    return res.data.messages;
}

// Add more functions as needed for reading and sending emails

import express from 'express';
import { google } from 'googleapis';
import { ConfidentialClientApplication } from '@azure/msal-node';

const authRouter = express.Router();

// Google OAuth setup
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

authRouter.get('/google', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/gmail.readonly'],
    });
    res.redirect(url);
});

authRouter.get('/google/callback', async (req, res) => {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);
    res.send('Google OAuth successful');
});

// Outlook OAuth setup
const msalConfig = {
    auth: {
        clientId: process.env.OUTLOOK_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.OUTLOOK_TENANT_ID}`,
        clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    },
};

const pca = new ConfidentialClientApplication(msalConfig);

authRouter.get('/outlook', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ['Mail.Read'],
        redirectUri: process.env.OUTLOOK_REDIRECT_URI,
    };

    pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    });
});

authRouter.get('/outlook/callback', (req, res) => {
    const tokenRequest = {
        code: req.query.code as string,
        scopes: ['Mail.Read'],
        redirectUri: process.env.OUTLOOK_REDIRECT_URI,
    };

    pca.acquireTokenByCode(tokenRequest).then((response) => {
        res.send('Outlook OAuth successful');
    }).catch((error) => {
        res.status(500).send(error);
    });
});

export { authRouter };

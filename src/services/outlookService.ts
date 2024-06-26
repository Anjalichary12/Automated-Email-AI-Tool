import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';

export async function readEmails(authProvider: any) {
    const client = Client.initWithMiddleware({
        authProvider: new TokenCredentialAuthenticationProvider(authProvider),
    });

    const res = await client.api('/me/messages').get();
    return res.value;
}

// Add more functions as needed for reading and sending emails

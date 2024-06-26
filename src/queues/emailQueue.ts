import { Queue } from 'bullmq';
import { readEmails as readGmailEmails } from '../services/gmailService';
import { readEmails as readOutlookEmails } from '../services/outlookService';
import { analyzeEmailContent, generateEmailReply } from '../services/aiService';

const emailQueue = new Queue('emails');

emailQueue.process(async (job) => {
    const { service, email } = job.data;

    let emails;
    if (service === 'gmail') {
        emails = await readGmailEmails(email.auth);
    } else if (service === 'outlook') {
        emails = await readOutlookEmails(email.auth);
    }

    for (const email of emails) {
        const content = email.snippet; // Modify this to get the full content
        const label = await analyzeEmailContent(content);
        const reply = await generateEmailReply(content);

        // Send reply logic here
        // For Gmail: Use Gmail API to send email
        // For Outlook: Use Outlook API to send email
    }
});

export { emailQueue };

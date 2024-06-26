import { app } from './app';
import { emailQueue } from './queues/emailQueue';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    emailQueue.process(); // Start processing the email queue
});

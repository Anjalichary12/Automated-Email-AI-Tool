import express from 'express';
import { emailQueue } from '../queues/emailQueue';

const emailRouter = express.Router();

emailRouter.post('/send', (req, res) => {
    const { service, email } = req.body;
    emailQueue.add('process-email', { service, email });
    res.send('Email added to the queue');
});

export { emailRouter };

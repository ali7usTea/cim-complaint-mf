import {logger} from '../../logger.js';
export default function handler(req, res) {
  const { level, message } = req.body;

  // Log the message with Winston on the server  
  logger.log({ level, message });
  res.status(200).json({ status: 'Message Logged successfully' });
}
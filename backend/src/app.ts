import 'express-async-errors';
import config from 'config';

import { connectToDatabase, handleExceptions, createServer } from './utils';

handleExceptions();
connectToDatabase();

const app = createServer();

const PORT = config.get('PORT') || 3000;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT} ...`);
});

app.get('/api/health-check', (req, res) => {
    res.status(200).send('Server listening');
});
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import register from '../routes/register';
import login from '../routes/login';
import update from '../routes/update';

import { exception } from '../middlewares/exception';

export function createServer() {

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api/user/update', update);
    app.use('/api/register', register);
    app.use('/api/login', login);

    app.use(exception);

    return app;
}
import { User } from '../models/user';

import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
    const user:any = await User.findOne({ email: req.body.email, password: req.body.password });
    if(!user) return res.status(404).send({message: 'Wrong email or password'});
    return res.status(200).send({ User: user });
});

export default router;
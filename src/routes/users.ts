import { Router } from 'express';

import { register, login } from '../services/user';

export const users = Router();

users

    .post('register', async (req, res) => {
        const result = await register(req.body);
        res.send(result);
    })

    .post('login', async (req, res) => {
        const result = await login(req.body);
        res.send(result);
    })
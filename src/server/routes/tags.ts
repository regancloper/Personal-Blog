import * as express from 'express';

import DB from '../db';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        let blogs = await DB.Tags.all();
        res.json(blogs);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;
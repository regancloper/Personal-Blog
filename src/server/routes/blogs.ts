import * as express from 'express';

import DB from '../db';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        let blogs = await DB.Blogs.all();
        res.json(blogs);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        let blogs = await DB.Blogs.one(id);
        res.json(blogs);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.post('/', async (req, res) => {
    let title = req.body.title;
    let tag = req.body.tag;
    let text = req.body.text;
    try {
        res.json(await DB.Blogs.add(title, tag, text));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let content = req.body.content;
    try {
        res.json(await DB.Blogs.edit(id, title, content));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        res.json(await DB.Blogs.remove(id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;
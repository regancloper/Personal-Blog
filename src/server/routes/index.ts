import * as express from 'express';
import blogsRouter from './blogs';
import tagsRouter from './tags';

const router = express.Router();

router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter);





export default router;
import Router from 'koa-router';
import * as bookHandler from '../handlers/books/bookHandlers';
import bookInputMiddleware from '../middleware/bookInputMiddleware';

// Prefix all routes with /books
const router = new Router({
  prefix: '/api'
});

// Routes will go here

router.get('/books', bookHandler.getBooks);
router.get('/books/:id', bookHandler.getBook);
router.post('/books', bookInputMiddleware, bookHandler.save);

export default router;

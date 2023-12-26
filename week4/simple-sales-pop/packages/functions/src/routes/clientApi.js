import Router from 'koa-router';
import * as clientApiController from '@functions/controllers/clientApiController';

const router = new Router({prefix: '/clientApi'});

router.get('/notifications', clientApiController.listNotifications);
// router.get('/notifications', () => console.log('im here =========================='));

export default router;

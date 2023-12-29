import Router from 'koa-router';
import * as clientApiController from '@functions/controllers/clientApiController';

const router = new Router({prefix: '/clientApi'});

router.get('/notifications', clientApiController.listNotifications);

export default router;

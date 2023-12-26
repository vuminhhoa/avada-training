import Router from 'koa-router';
import {verifyWebhook} from '@avada/shopify-auth';
import * as webhookController from '@functions/controllers/webhookController';

const router = new Router({prefix: '/webhook'});

// router.use(verifyWebhook);
router.post('/order/new', webhookController.listenNewOrder);

export default router;

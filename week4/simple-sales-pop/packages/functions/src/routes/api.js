import Router from 'koa-router';
import * as sampleController from '@functions/controllers/sampleController';
import * as settingsController from '@functions/controllers/settingsController';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import * as notificationsController from '@functions/controllers/notificationsController';
import * as appNewsController from '@functions/controllers/appNewsController';
import {getApiPrefix} from '@functions/const/app';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/samples', sampleController.exampleAction);

  router
    .get('/settings', settingsController.getSetting)
    .put('/settings', settingsController.updateSetting);

  router
    .get('/notifications', notificationsController.listNotifications)
    .delete('/notifications', notificationsController.deleteNotifications);

  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  router.get('/appNews', appNewsController.getList);

  return router;
}

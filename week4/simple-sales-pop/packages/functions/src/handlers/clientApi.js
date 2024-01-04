import App from 'koa';
import * as errorService from '@functions/services/errorService';
import router from '../routes/clientApi';
import cors from '@koa/cors';
import Koa from 'koa';
import koaBody from 'koa-body';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;

api.use(cors());
api.use(koaBody({parsedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}));
// Register all routes for the application
api.use(router.allowedMethods());
api.use(router.routes());

// Handling all errors
api.on('error', errorService.handleError);

export default api;

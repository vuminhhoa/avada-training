import * as yup from "yup";
import { errorHandler } from "../helpers/utils/responseHandlers";
export default async function todoInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      text: yup.string().required(),
    });

    await schema.validate(postData);
    return next();
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

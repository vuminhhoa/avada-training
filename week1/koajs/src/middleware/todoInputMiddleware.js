import yup from "yup";
import { errorHandler } from "../handlers/responses/responseHandlers";
export default async function todoInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      text: yup.string().required(),
    });

    await schema.validate(postData);
    next();
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

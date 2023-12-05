const yup = require("yup");

export default async function productInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      name: yup.string().required(),
      price: yup.number().required(),
      description: yup.string().required(),
      product: yup.string().required(),
      color: yup.string().required(),
      image: yup.string().required(),
    });

    await schema.validate(postData);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

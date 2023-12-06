export function successHandler(ctx, data, status) {
  ctx.status = status;
  ctx.body = {
    success: true,
    data: data,
  };
}
export function errorHandler(ctx, error, data) {
  if (typeof error === "string") {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: data,
      message: error,
    };
  } else {
    ctx.status = error.status;
    ctx.body = {
      success: error.success,
      data: data || error.data,
      message: error.message,
    };
  }
}

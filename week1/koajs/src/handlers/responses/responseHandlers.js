export function successHandler(ctx, data, status) {
  ctx.status = status;
  ctx.body = {
    success: true,
    data: data,
  };
}
export function errorHandler(ctx, error, data) {
  if (typeof error === "string") {
    ctx.status = 400;
    ctx.body = {
      success: false,
      data: data,
      message: error,
    };
  } else if (error?.status && error?.message && error?.success) {
    ctx.status = error.status;
    ctx.body = {
      success: error.success,
      data: data || error.data,
      message: error.message,
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      success: false,
      data: data,
      message: error.message,
    };
  }
}

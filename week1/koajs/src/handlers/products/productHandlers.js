import {
  list,
  getOne,
  add,
  remove,
  update,
} from "../../database/productRepository";
import {
  successHandler,
  errorHandler,
} from "../../helpers/utils/responseHandlers";

export async function getProducts(ctx) {
  try {
    const { limit, sort } = ctx.query;
    const products = list(limit, sort);
    return successHandler(ctx, products);
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.query;
    const product = getOne(id, fields);
    if (product) {
      return successHandler(ctx, product);
    }
    return errorHandler(ctx, "Product Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    const product = getOne(id);
    if (product) {
      remove(id);
      return successHandler(ctx, {});
    }
    return errorHandler(ctx, "Product Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function updateProduct(ctx) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.params;
    const product = getOne(id);
    if (product) {
      update(id, data);
      return successHandler(ctx, {});
    }
    return errorHandler(ctx, "Product Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function createProduct(ctx) {
  try {
    const postData = ctx.request.body;
    const newProduct = add(postData);

    return successHandler(ctx, newProduct, 201);
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

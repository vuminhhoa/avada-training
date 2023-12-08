import {
  getAll as getAllProducts,
  getOne as getOneProduct,
  add as addProduct,
  remove as removeProduct,
  update as updateProduct,
} from "../../database/productRepository";
import {
  successHandler,
  errorHandler,
} from "../../helpers/utils/responseHandlers";

export async function getProducts(ctx) {
  try {
    const { limits, sort } = ctx.query;
    let products = getAllProducts(limits, sort);
    return successHandler(ctx, products, 200);
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.query;
    const product = getOneProduct(id, fields);
    if (product) {
      return successHandler(ctx, product, 200);
    }
    return errorHandler(ctx, "Product Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    const product = getOneProduct(id);
    if (product) {
      removeProduct(id);
      return successHandler(ctx, {}, 200);
    }
    return errorHandler(ctx, "Product Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}
export async function updateOneProduct(ctx) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.params;
    const product = getOneProduct(id);
    if (product) {
      updateProduct(id, data);
      return successHandler(ctx, {}, 200);
    }

    return errorHandler(ctx, "Product Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function save(ctx) {
  try {
    const postData = ctx.request.body;
    addProduct(postData);

    return successHandler(ctx, {}, 200);
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

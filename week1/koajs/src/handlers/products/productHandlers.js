import {
  getAll as getAllProducts,
  getOne as getOneProduct,
  add as addProduct,
  remove as removeProduct,
  update as updateProduct,
  getFields as getFieldsProduct,
  getLimits as getLimitsProduct,
  sortAsc as sortAscProduct,
  sortDesc as sortDescProduct,
} from "../../database/productRepository";
import { successHandler, errorHandler } from "../responses/responseHandlers";

export async function getProducts(ctx) {
  try {
    const { limits, sort } = ctx.query;
    let products = getAllProducts();

    if (sort) {
      if (sort === "asc") {
        sortAscProduct(products, sort);
      }
      if (sort === "desc") {
        sortDescProduct(products, sort);
      }
    }

    if (limits) {
      products = getLimitsProduct(products, limits);
    }
    return successHandler(ctx, products, 200);
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.query;
    let currentProduct = getOneProduct(id);
    if (currentProduct) {
      if (fields) {
        currentProduct = getFieldsProduct(currentProduct, fields);
      }
      return successHandler(ctx, currentProduct, 200);
    }
    return errorHandler(ctx, "Product Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    const currentProduct = getOneProduct(id);
    if (currentProduct) {
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
    const currentProduct = getOneProduct(id);
    if (currentProduct) {
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
    const isHas = getOneProduct(postData.id);
    if (isHas) {
      return errorHandler(ctx, "Product Found with that id!");
    } else {
      const currentDate = new Date();
      addProduct({ ...postData, createdAt: currentDate.toISOString() });
    }

    return successHandler(ctx, {}, 200);
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

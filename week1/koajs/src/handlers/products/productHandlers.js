import {
  getAll as getAllProducts,
  getOne as getOneProduct,
  add as addProduct,
  remove as removeProduct,
  update as removeProduct,
} from "../../database/productRepository";

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getProducts(ctx) {
  try {
    const products = getAllProducts();

    ctx.body = {
      data: products,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{data: {author: string, name: string, id: number}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
export async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const getCurrentProduct = getOneProduct(id);
    if (getCurrentProduct) {
      return (ctx.body = {
        data: getCurrentProduct,
      });
    }

    throw new Error("Product Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

export async function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    const getCurrentProduct = getOneProduct(id);
    if (getCurrentProduct) {
      removeProduct(id);
      return (ctx.body = {
        success: true,
      });
    }

    throw new Error("Product Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}
export async function updateProduct(ctx) {
  try {
    const { id } = ctx.params;
    const { data } = ctx.body;
    const getCurrentProduct = getOneProduct(id);
    if (getCurrentProduct) {
      removeProduct(id);
      return (ctx.body = {
        success: true,
      });
    }

    throw new Error("Product Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
export async function save(ctx) {
  try {
    const postData = ctx.request.body;
    addProduct(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

import {
  getAll as getAllProducts,
  getOne as getOneProduct,
  add as addProduct,
  remove as removeProduct,
  update as updateProduct,
} from "../../database/productRepository";

export async function getProducts(ctx) {
  try {
    const { limits, sort } = ctx.query;
    const products = getAllProducts({ limits, sort });

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

export async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.query;
    const getCurrentProduct = getOneProduct(id, { fields });
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
    const getCurrentProduct = getOneProduct({ id });
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
export async function updateOneProduct(ctx) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.params;
    const getCurrentProduct = getOneProduct(id);
    if (getCurrentProduct) {
      updateProduct(id, data);
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

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
    let currentProduct = getOneProduct(id);
    if (currentProduct) {
      if (fields) {
        currentProduct = getFieldsProduct(currentProduct, fields);
      }
      return (ctx.body = {
        data: currentProduct,
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
    const currentProduct = getOneProduct(id);
    if (currentProduct) {
      removeProduct(id);
      return (ctx.body = {
        success: true,
      });
    }

    throw new Error("Product Not Found with that id!");
  } catch (e) {
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
    const currentProduct = getOneProduct(id);
    if (currentProduct) {
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
    const isHas = getOneProduct(postData.id);
    if (isHas) {
      throw new Error("Product Found with that id!");
    } else {
      const currentDate = new Date();
      addProduct({ ...postData, createdAt: currentDate.toISOString() });
    }

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

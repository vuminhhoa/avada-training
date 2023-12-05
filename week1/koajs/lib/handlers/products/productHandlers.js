"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProduct = deleteProduct;
exports.getProduct = getProduct;
exports.getProducts = getProducts;
exports.save = save;
exports.updateProduct = updateProduct;
var _productRepository = require("../../database/productRepository");
/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
  try {
    const products = (0, _productRepository.getAll)();
    ctx.body = {
      data: products
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{data: {author: string, name: string, id: number}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getProduct(ctx) {
  try {
    const {
      id
    } = ctx.params;
    const getCurrentProduct = (0, _productRepository.getOne)(id);
    if (getCurrentProduct) {
      return ctx.body = {
        data: getCurrentProduct
      };
    }
    throw new Error("Product Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return ctx.body = {
      success: false,
      error: e.message
    };
  }
}
async function deleteProduct(ctx) {
  try {
    const {
      id
    } = ctx.params;
    const getCurrentProduct = (0, _productRepository.getOne)(id);
    if (getCurrentProduct) {
      (0, _productRepository.remove)(id);
      return ctx.body = {
        success: true
      };
    }
    throw new Error("Product Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return ctx.body = {
      success: false,
      error: e.message
    };
  }
}
async function updateProduct(ctx) {
  try {
    const {
      id
    } = ctx.params;
    const {
      data
    } = ctx.body;
    const getCurrentProduct = (0, _productRepository.getOne)(id);
    if (getCurrentProduct) {
      (0, _productRepository.remove)(id);
      return ctx.body = {
        success: true
      };
    }
    throw new Error("Product Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return ctx.body = {
      success: false,
      error: e.message
    };
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function save(ctx) {
  try {
    const postData = ctx.request.body;
    (0, _productRepository.add)(postData);
    ctx.status = 201;
    return ctx.body = {
      success: true
    };
  } catch (e) {
    return ctx.body = {
      success: false,
      error: e.message
    };
  }
}
//# sourceMappingURL=productHandlers.js.map
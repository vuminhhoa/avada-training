import {
  list,
  getOne,
  add,
  remove,
  update,
  bulkRemove,
  bulkUpdate,
} from "../../database/todoRepository";
import {
  successHandler,
  errorHandler,
} from "../../helpers/utils/responseHandlers";

export async function getTodos(ctx) {
  try {
    const { limits, sort } = ctx.query;
    const todos = await list({ limits, sort });
    return successHandler(ctx, todos);
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function getTodo(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.query;
    const todo = await getOne(id, fields);
    if (todo) {
      return successHandler(ctx, todo);
    }
    return errorHandler(ctx, "Todo Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function deleteTodo(ctx) {
  try {
    const { id } = ctx.params;
    const todo = await getOne(id);
    if (todo) {
      await remove(id);
      return successHandler(ctx, {});
    }
    return errorHandler(ctx, "Todo Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function deleteTodos(ctx) {
  try {
    const ids = ctx.request.body;
    await bulkRemove(ids);
    return successHandler(ctx, {});
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function updateTodo(ctx) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.params;
    const todo = await getOne(id);
    if (todo) {
      await update(id, data);
      return successHandler(ctx, {});
    }
    return errorHandler(ctx, "Todo Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function updateTodos(ctx) {
  try {
    const { ids, data } = ctx.request.body;
    await bulkUpdate(ids, data);
    return successHandler(ctx, {});
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function createTodo(ctx) {
  try {
    await add(ctx.request.body);
    return successHandler(ctx, {}, 201);
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

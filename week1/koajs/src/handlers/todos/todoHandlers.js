import {
  getAll,
  getOne,
  add,
  remove,
  update,
  massRemove,
  massUpdate,
} from "../../database/todoRepository";
import {
  successHandler,
  errorHandler,
} from "../../helpers/utils/responseHandlers";

export async function getTodos(ctx) {
  try {
    const { limits, sort } = ctx.query;
    const todos = getAll(limits, sort);
    return successHandler(ctx, todos);
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function getTodo(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.query;
    const todo = getOne(id, fields);
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
    const todo = getOne(id);
    if (todo) {
      remove(id);
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
    massRemove(ids);
    return successHandler(ctx, {});
  } catch (e) {
    return errorHandler(ctx, e);
  }
}
export async function updateTodo(ctx) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.params;
    const todo = getOne(id);
    if (todo) {
      update(id, data);
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
    massUpdate(ids, data);
    return successHandler(ctx, {});
  } catch (e) {
    return errorHandler(ctx, e);
  }
}
export async function createTodo(ctx) {
  try {
    const postData = ctx.request.body;
    const newTodo = add(postData);

    return successHandler(ctx, newTodo, 201);
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

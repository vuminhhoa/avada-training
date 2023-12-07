import {
  getAll as getAllTodos,
  getOne as getOneTodo,
  add as addTodo,
  remove as removeTodo,
  update as updateTodo,
} from "../../database/todoRepository";
import {
  getFields as getFieldsTodo,
  getLimits as getLimitsTodo,
  sortAscByField as sortAscTodo,
  sortDescByField as sortDescTodo,
} from "../../utils/repositoryUtils";
import { successHandler, errorHandler } from "../../utils/responseHandlers";

export async function getTodos(ctx) {
  try {
    const { limits, sort } = ctx.query;
    let todos = getAllTodos();

    if (sort) {
      if (sort === "asc") {
        sortAscTodo(todos, "id");
      }
      if (sort === "desc") {
        sortDescTodo(todos, "id");
      }
    }

    if (limits) {
      todos = getLimitsTodo(todos, limits);
    }

    return successHandler(ctx, todos, 200);
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function getTodo(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.query;
    let currentTodo = getOneTodo(id);
    if (currentTodo) {
      if (fields) {
        currentTodo = getFieldsTodo(currentTodo, fields);
      }
      return successHandler(ctx, currentTodo, 200);
    }
    return errorHandler(ctx, "Todo Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function deleteTodo(ctx) {
  try {
    const { id } = ctx.params;
    const currentTodo = getOneTodo(id);
    if (currentTodo) {
      removeTodo(id);
      return successHandler(ctx, {}, 200);
    }

    return errorHandler(ctx, "Todo Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}
export async function updateOneTodo(ctx) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.params;
    const currentTodo = getOneTodo(id);
    if (currentTodo) {
      updateTodo(id, data);
      return successHandler(ctx, {}, 200);
    }
    return errorHandler(ctx, "Todo Not Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

export async function save(ctx) {
  try {
    const postData = ctx.request.body;
    const isHas = getOneTodo(postData.id);
    if (!isHas) {
      const todos = getAllTodos();
      sortDescTodo(todos, "id");
      const newTodo = {
        ...postData,
        id: todos[0]?.id + 1 || 1,
        isCompleted: false,
      };
      addTodo(newTodo);

      return successHandler(ctx, newTodo, 201);
    }

    return errorHandler(ctx, "Todo Found with that id!");
  } catch (e) {
    return errorHandler(ctx, e);
  }
}

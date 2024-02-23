export const getSelectedUndoneTodos = (state) =>
  state.todos?.todos?.filter((todo) => !todo.done) || null;

export const getSelectedDoneTodos = (state) => {
  const todosStore = state.todos;
  const doneTodos = todosStore?.doneTodos;
  if (!doneTodos) {
    return null;
  }

  const offset = todosStore.doneTodosOffset;
  const limit = todosStore.doneTodosLimit;

  const list =
    doneTodos?.filter((todo) => {
      const doneTodoFilter = todosStore.doneTodosFilter.toLowerCase();
      const todoTitle = todo.title.toLowerCase();

      return todo.done && todoTitle.includes(doneTodoFilter);
    }) || null;

  return list?.slice(0, limit * offset);
};

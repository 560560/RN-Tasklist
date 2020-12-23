export const getSelectedTodos = (state) => {
    let prepearedTodos = [...state.todos.todos]
    if (!state.todos.showDoneTasks) {
        prepearedTodos = prepearedTodos.filter(todo => !todo.isDone)
    }

    prepearedTodos = prepearedTodos.filter(todo => !todo.deleted)

    return prepearedTodos
}
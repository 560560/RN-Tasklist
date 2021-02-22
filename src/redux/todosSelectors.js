export const getSelectedTodos = (state) => {
    return state.todos?.todos?.filter(todo => !todo.isDone) || null
}

export const getDoneTodos = (state) => {
    return state.todos?.todos?.filter(todo => todo.isDone) || null
}
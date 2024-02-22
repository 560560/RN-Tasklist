import axios from 'axios';

const backIP = '217.107.34.222';

const instance = axios.create({
  baseURL: `http://${backIP}:8090/api/`,
  headers: { 'Content-Type': 'application/json' },
});

export const navbarApi = {
  getAppNameWithAPI() {
    return instance.get('appName');
  },
  getConnectionStatusWithAPI() {
    return instance.get('status');
  },
};

export const todosApi = {
  getTodosWithAPI(authKey) {
    return instance.get('todos', { params: { authKey } });
  },
  getDoneTodosWithAPI(authKey) {
    return instance.get('done-todos', { params: { authKey } });
  },
  addTodoWithAPI(title, authKey) {
    return instance.post('todos', { title, authKey });
  },
  deleteTodoWithAPI(id, authKey) {
    return instance.delete('todos', { data: { id: id, authKey } });
  },
  checkTodoWithAPI(id, done, authKey) {
    return instance.put('done', { id: id, done, authKey });
  },
  editTodoWithAPI(id, newTitle, authKey) {
    return instance.put('todo-edit', { id: id, title: newTitle, authKey });
  },
};

export const authApi = {
  logInWithAPI(email, pass) {
    return instance.post('login', { email, password: pass });
  },
  signUpUserWithAPI(name, email, pass) {
    return instance.post('register', { name, email, password: pass });
  },
};

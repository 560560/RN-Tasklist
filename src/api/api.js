import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://agro-api.site:4000/',
  headers: {'Content-Type': 'application/json'},
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
    return instance.get('todos', {params: {authKey: authKey}});
  },
  addTodoWithAPI(title, authKey) {
    return instance.post('todos', {title: title, authKey: authKey});
  },
  deleteTodoWithAPI(_id, authKey) {
    return instance.delete('todos', {data: {id: _id, authKey: authKey}});
  },
  editTodoWithAPI(_id, newTitle, authKey) {
    return instance.post('todo-edit', {id: _id, newTitle: newTitle, authKey: authKey});
  },
};

export const authApi = {
  logInWithAPI(email, pass) {
    return instance.post('login', {email: email, password: pass});
  },
  signUpUserWithAPI(name, email, pass) {
    return instance.post('register', {name: name, email: email, password: pass});
  },
};
import * as axios from 'axios';

const instance = axios.create({
  baseURL: "http://agro-api.site:4000/",
  headers: {'Content-Type': 'application/json'}
})

export const navbarApi = {
  getAppNameWithAPI() {
    return instance.get('appName')
  },
  getConnectionStatusWithAPI() {
    return instance.get('status')
  },
};

export const todosApi = {
  getTodosWithAPI (authKey) {
    console.log("authKey = ",authKey)
    return instance.get("todos", {params: {authKey: authKey}})
  },
  addTodoWithAPI (title, authKey) {
    return instance.post("todos", {title: title, authKey: authKey})
  },
  editTodoWithAPI (_id, newTitle, authKey) {
    return instance.post("todo-edit", {id: _id, newTitle: newTitle, authKey: authKey})
  }
}
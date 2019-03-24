const baseUrl = process.env.API_URL;
const Todo = {
  getList(token) {
    return fetch(`${baseUrl}/api/users/get_todo`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json());
  },
  actionTodo(token, payload) {
    return fetch(`${baseUrl}/api/users/todo`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ todos: payload }),
    }).then(res => res.json());
  },
};
export default Todo;

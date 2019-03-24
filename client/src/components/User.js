import React, { useState, useEffect, Fragment } from 'react';
import Todo from '../utils/todo';
import TodoList from '../components/TodoList';
import Loader from '../components/Loader';

const User = props => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isValid, setIsValid] = useState(localStorage.getItem('isValid'));
  const [message, setMessage] = useState(undefined);
  const [todoList, setTodoList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Boolean(isValid)) {
      setMessage('Unauthorize route redirecting..');
      setTimeout(() => {
        props.history.push('/login');
      }, 1000);
    } else {
      Todo.getList(token)
        .then(({ todos }) => {
          setTodoList(todos);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          setMessage('An Error Occured While Fething Please Check internet Connection');
        });
    }
  }, []);

  const addTodo = e => {
    e.preventDefault();
    const name = itemName;
    const newList = [...todoList, { name, isCompleted: false }];
    Todo.actionTodo(token, newList).then(({ todos }) => {
      setTodoList(todos);
      setItemName('');
      // console.log(res);
    });
  };
  const isCompleted = (e, id) => {
    // console.log(id);

    const newTodo = [...todoList];
    newTodo.map(d => {
      if (id === d._id) {
        d.isCompleted = e.target.checked;
      }
    });
    Todo.actionTodo(token, newTodo).then(({ todos }) => {
      setTodoList(todos);
    });
  };
  const handleDelete = (id, msg) => {
    var r = confirm(msg);
    if (r == true) {
      const newTodo = todoList.filter(d => {
        if (id != d._id) return true;
      });
      Todo.actionTodo(token, newTodo).then(({ todos }) => {
        setTodoList(todos);
      });
    }
  };
  const handleEdit = (e, d) => {
    handleDelete(d._id, `Are you sure to Edit ${d.name}`);
    setItemName(d.name);
  };
  return (
    <div className="container">
      {message ? (
        <div className="row todo-container">
          <h3 className="text-center">{message}</h3>
        </div>
      ) : (
        <Fragment>
          <h2 className="text-center">Todo Application</h2>
          <div className="row todo-container">
            <div className="col-3">
              <div className="input-group mb-3">
                <input
                  id="todo-input-box"
                  type="text"
                  className="form-control"
                  placeholder="Add Todo Items"
                  onChange={e => {
                    e.target.setAttribute('autoFocus', true);
                    setItemName(e.target.value);
                  }}
                  value={itemName}
                />
                <div className="input-group-append">
                  <button className="btn btn-success" type="submit" onClick={addTodo}>
                    Add Todo
                  </button>
                </div>
              </div>
            </div>
            <div className="col-9">
              {isLoading ? (
                <Loader msg=" Fetching Todo List .." />
              ) : (
                <TodoList list={todoList} onComplete={isCompleted} onDelete={handleDelete} onEdit={handleEdit} />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default User;

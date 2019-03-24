import React, { Fragment, useEffect } from 'react';

const TodoList = props => {
  const { list: todo } = props;
  useEffect(() => {
    // Appying Effect if Todo Changes
  }, [todo]);

  return (
    <Fragment>
      <div className="container">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todo.map((d, i) => {
                return (
                  <tr key={d._id || i} className={d.isCompleted ? 'table-info' : null}>
                    <td className="col-1">
                      <input
                        type="checkbox"
                        className="form-input"
                        defaultChecked={d.isCompleted}
                        onChange={e => props.onComplete(e, d._id)}
                      />
                    </td>
                    <td>{d.name}</td>
                    {!d.isCompleted ? (
                      <td className="col-3">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={e => props.onDelete(d._id, `Are you sure to Delete this ${d.name}`)}
                        >
                          Delete
                        </button>{' '}
                        <button className="btn btn-primary btn-sm" onClick={e => props.onEdit(e, d)}>
                          Edit
                        </button>
                      </td>
                    ) : (
                      <td>
                        <span className="badge badge-success"> Task Completed</span>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

TodoList.defaultProps = {
  list: [],
};
export default TodoList;

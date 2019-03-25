const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/Users.js');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../configs/keys');
const passport = require('passport');

/*
 * @route : POST /api/user/register
 * @access : Public
 * @description: Registration for new users
 */

router.post('/register', (req, res) => {
  const { email, name, password, role } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ error: `User Already Exisit with email id : ${email}` });
    } else {
      const newUser = new User({
        name,
        email,
        role,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json({ message: ' User Account Created Successfully' });
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    }
  });
});

/*
 * @route : POST /api/user/login
 * @access : Public
 * @description: Validate the User and Logged in and return JWT
 */

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // find USer by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ error: `User Not Found Please register` });
    }
    // checking password
    const { password: hashedPassword } = user;
    bcrypt.compare(password, hashedPassword).then(isMatch => {
      if (isMatch) {
        // Creating Payload for tokenisation
        const { id, name } = user;
        const payload = { id, name };
        // Signing token
        jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ error: 'Something Went wrong' });
          } else {
            res.json({
              message: 'Login is successful',
              success: true,
              token,
            });
          }
        });
      } else {
        res.status(400).json({ error: 'Wrong Username or Password' });
      }
    });
  });
});

/*
 * @route : GET /api/user/current
 * @access : Private
 * @description: Registration for new users
 */

router.get('/info', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, name, email, todos, role } = req.user;
  res.json({ id, name, email, todos, role });
});

router.get('/validate', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.user;
  if (Boolean(id)) {
    res.json({ isValid: true, message: 'Token Validated' });
  } else {
    res.status(400).json({ isValid: false, error: 'invalid token' });
  }
});
/*
 * @route : POST /api/user/todo
 * @access : Private
 * @description:  User Can Add Todo List
 */

router.post('/todo/_bulk', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { todos } = req.body;
  const { id } = req.user;
  User.findById(id).then(user => {
    if (user) {
      user.todos = todos;
      user.save();
      res.json({ todos: user.todos });
    } else {
      return res.status(400).json({ error: 'Something went wrong while saving' });
    }
  });
});

/*
 * @route : POST /api/user/add_todo
 * @access : Private
 * @description:  Add  todo's
 */

router.post('/add_todo', passport.authenticate('jwt', { session: false }), (req, res) => {
  const todos = { ...req.body };
  const { id } = req.user;
  if (todos.constructor.name === 'Object') {
    User.findById(id).then(user => {
      if (user) {
        const newTodos = [...user.todos, { ...todos }];
        console.log(newTodos);
        user.todos = newTodos;
        user.save();
        res.json({ message: 'Added Todos Successfully ', todos: user.todos });
      } else {
        return res.status(400).json({ error: 'Something went wrong while saving' });
      }
    });
  } else {
    return res.status(500).json({ error: 'Expecting an Object in body' });
  }
});

/*
 * @route : DELETE /api/user/add_todo
 * @access : Private
 * @description:  Add  todo's
 */

router.delete('/delete_todo/:todo_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { todo_id } = req.params;
  const { id } = req.user;
  User.findById(id).then(user => {
    if (user) {
      const newTodos = user.todos.filter(d => {
        if (todo_id != d._id) return true;
      });
      console.log(newTodos);
      user.todos = newTodos;
      user.save();
      res.json({ message: 'Deleted Todos Successfully ', todos: user.todos });
    } else {
      return res.status(400).json({ error: 'Something went wrong while saving' });
    }
  });
});

/*
 * @route : UPDATE /api/user/update_todo
 * @access : Private
 * @description:  Add  todo's
 */

router.post('/update_todo/:todo_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { todo_id } = req.params;
  const { id } = req.user;
  const update = { ...req.body };
  if (update.constructor.name === 'Object') {
    User.findById(id).then(user => {
      if (user) {
        const newTodo = [...user.todos];
        const index = newTodo.findIndex(d => {
          if (todo_id == d._id) return true;
        });
        console.log(index);
        newTodo[index] = { ...update, _id: newTodo[index]._id };
        user.todos = newTodo;
        user.save();
        res.json({ message: 'Updated Todos Successfully ', todos: user.todos });
      } else {
        return res.status(400).json({ error: 'Something went wrong while saving' });
      }
    });
  } else {
    return res.status(500).json({ error: 'Expecting a Object in body' });
  }
});
/*
 * @route : POST /api/user/todo
 * @access : Private
 * @description:  User Can Add Todo List
 */

router.get('/get_todo', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.user;
  User.findById(id).then(user => {
    if (user) {
      res.json({ todos: user.todos });
    } else {
      return res.status(400).json({ error: 'Something went wrong' });
    }
  });
});

module.exports = router;
